import {
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import {
  CieloConstructor,
  Cielo,
  EnumCardType,
  DebitCardSimpleTransactionRequestModel,
  EnumBrands,
  ConsultTransactionMerchantOrderIdRequestModel,
  ConsultTransactionPaymentIdRequestModel,
} from 'cielo';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Payment } from './entities/payment.entity';
import { DebitCard } from './entities/debit-card.entity';
import { HttpLogDTO } from 'src/common/dtos/httplog.dto';
import { Transaction } from './entities/transaction.entity';
import { Wallet } from 'src/wallets/entities/wallet.entity';
import * as uuid from 'uuid';
import { Seller } from 'src/sellers/entities/seller.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDebitCardDto } from './dto/create-debit-card.dto';
import RabbitmqServer from '../common/rabbitmq-server';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PaymentsService {
  constructor() {}

  @InjectModel('User') private readonly userMyModel: Model<User>;
  @InjectModel('Seller') private readonly sellerMyModel: Model<Seller>;
  @InjectModel('Payment') private readonly paymentMyModel: Model<Payment>;
  @InjectModel('Wallet') private readonly walletMyModel: Model<Wallet>;
  @InjectModel('Transaction')
  private readonly transactionMyModel: Model<Transaction>;

  @Inject('RABBIT_PUBLISH_CHANNEL')
  private readonly publishChannel: ClientProxy;

  async createPayment(
    { amount, debitCard, sellerId }: CreatePaymentDto,
    customerId: string,
  ) {
    const seller = await this.sellerMyModel.findOne({ _id: sellerId });

    if (!seller) {
      throw new NotFoundException('Seller Not Found!');
    }

    let payment = new Payment();
    const orderId = uuid.v4();
    Object.assign(payment, {
      orderId,
      amount,
      status: 'n/a',
      seller: sellerId,
      customer: customerId,
      debitCard,
      created_at: new Date().toISOString(),
    });

    return await this.sendRequestCielo(payment);
  }

  async sendRequestCielo(payment: Payment) {
    const cieloParams: CieloConstructor = {
      merchantId: process.env.MERCHANTID,
      merchantKey: process.env.MERCHANTKEY,
      requestId: 'xxxxxxx', // Opcional - Identificação do Servidor na Cielo
      sandbox: true, // Opcional - Ambiente de Testes
      debug: true, // Opcional - Exibe os dados enviados na requisição para a Cielo
    };

    const cielo = new Cielo(cieloParams);

    const debitCardTransactionParams: DebitCardSimpleTransactionRequestModel = {
      merchantOrderId: payment.orderId,
      customer: {
        name: 'Paulo Henrique',
      },
      payment: {
        type: EnumCardType.DEBIT,
        amount: payment.amount,
        provider: 'Simulado',
        returnUrl: process.env.WEBHOOK_URL,
        debitCard: {
          cardNumber: payment.debitCard.cardNumber,
          holder: payment.debitCard.holder,
          expirationDate: payment.debitCard.expirationDate,
          securityCode: payment.debitCard.securityCode,
          brand: EnumBrands.VISA,
        },
      },
    };

    const transaction = await cielo.debitCard
      .createSimpleTransaction(debitCardTransactionParams)
      .then(async (res) => {
        // console.log('res: ', res);

        //
        var timestamp = new Date().getTime();
        var message = {
          url: 'req.originalUrl',
          body: res,
          method: 'POST',
          headers: 'req.headers',
          timestamp: timestamp,
        };

        var payload = {
          pattern: 'create-rmq-channel',
          data: message,
        };
        const server = new RabbitmqServer(process.env.AMQP_URL);
        await server.start();
        await server.publishInQueue(
          process.env.AMQP_QUEUE,
          JSON.stringify(payload),
        );

        //

        return res;
      })
      .catch((err) => {
        var message = err.response;
        console.error('err: ', message);
        return message;
      });

    // payment = await this.paymentMyModel.save(payment); // pg
    payment = await new this.paymentMyModel(payment).save(); // mg

    return transaction;
  }

  async validatePayment(id: string) {
    const cieloParams: CieloConstructor = {
      merchantId: process.env.MERCHANTID,
      merchantKey: process.env.MERCHANTKEY,
      requestId: 'xxxxxxx', // Opcional - Identificação do Servidor na Cielo
      sandbox: true, // Opcional - Ambiente de Testes
      debug: true, // Opcional - Exibe os dados enviados na requisição para a Cielo
    };

    const cielo = new Cielo(cieloParams);

    const consultTransactionMerchantOrderI: ConsultTransactionMerchantOrderIdRequestModel =
      {
        merchantOrderId: id,
      };

    const consultTransactionPaymentId: ConsultTransactionPaymentIdRequestModel =
      {
        paymentId: id,
      };

    const response: any = await cielo.consult
      // .merchantOrderId(consultTransactionMerchantOrderI)
      .paymentId(consultTransactionPaymentId)
      .then((res) => {
        // console.log('res: ', res);
        return res;
      })
      .catch((err) => {
        console.log('err: ', err);
      });

    //
    var timestamp = new Date().getTime();
    var message = {
      url: 'req.originalUrl',
      body: response,
      method: 'POST',
      headers: 'req.headers',
      timestamp: timestamp,
    };

    var payload = {
      pattern: 'create-rmq-channel',
      data: message,
    };
    const server = new RabbitmqServer(process.env.AMQP_URL);
    await server.start();
    await server.publishInQueue(
      process.env.AMQP_QUEUE,
      JSON.stringify(payload),
    );

    //

    const orderId = response.merchantOrderId;
    // if (response.payment.status === 2) {
    return await this.approvePayment(orderId);
    // }
    return await this.refusePayment(orderId);
  }

  async approvePayment(id: string) {
    // change status
    let payment = await this.paymentMyModel.findOne({ orderId: id });
    payment.status = 'Approved';

    payment = await new this.paymentMyModel(payment).save();

    // insert record wallet

    // const sellerWallet = payment.seller.wallet;
    // sellerWallet.amount += payment.amount;

    var obj = payment.toJSON();

    const sellerWallet: any = {
      sellerId: payment.amount,
      amount: payment.amount,
      transaction: 123,
    };

    await new this.walletMyModel(sellerWallet).save();

    // insert record transaction

    await this.createTransaction(payment.amount, payment.orderId, sellerWallet);

    return payment;
  }

  async refusePayment(id: string) {
    console.log('@@@ refusePayment', id);
    let payment = await this.paymentMyModel.findOne({ orderId: id });

    payment.status = 'Refused';

    payment = await new this.paymentMyModel(payment).save();

    return payment;
  }

  async createTransaction(amount: number, orderId: string, wallet: Wallet) {
    console.log('@@@ createTransaction');
    const transaction = new Transaction();

    const walletId = 'uuid.v4()';

    const id = uuid.v4();

    Object.assign(transaction, {
      amount,
      orderId,
      walletId,
    });

    await new this.transactionMyModel(transaction).save();
  }
}
