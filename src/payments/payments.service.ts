import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import {
  CieloConstructor,
  Cielo,
  EnumCardType,
  DebitCardSimpleTransactionRequestModel,
  EnumBrands,
  ConsultTransactionMerchantOrderIdRequestModel,
  ConsultTransactionPaymentIdRequestModel,
} from 'cielo';
import { ClientProxy } from '@nestjs/microservices';
import { Payment } from './entities/payment.entity';
import { Transaction } from './entities/transaction.entity';
import { Wallet } from 'src/wallets/entities/wallet.entity';
import * as uuid from 'uuid';
import { Seller } from 'src/sellers/entities/seller.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import RabbitmqServer from '../common/rabbitmq-server';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PaymentsService {
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

    const payment = new Payment();
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

  myCielo() {
    const cieloParams: CieloConstructor = {
      merchantId: process.env.MERCHANTID,
      merchantKey: process.env.MERCHANTKEY,
      requestId: 'xxxxxxx', // Opcional - Identificação do Servidor na Cielo
      sandbox: true, // Opcional - Ambiente de Testes
      debug: true, // Opcional - Exibe os dados enviados na requisição para a Cielo
    };

    const cielo = new Cielo(cieloParams);

    return cielo;
  }

  async sendRequestCielo(payment: Payment) {
    const cielo = this.myCielo();

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
        const timestamp = new Date().getTime();
        const message = {
          url: 'req.originalUrl',
          body: res,
          method: 'POST',
          headers: 'req.headers',
          timestamp: timestamp,
        };

        const payload = {
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
        const message = err.response;
        console.error('err: ', message);
        return message;
      });

    // payment = await this.paymentMyModel.save(payment); // pg
    payment = await new this.paymentMyModel(payment).save(); // mg

    return transaction;
  }

  async validatePayment(id: string) {
    const cielo = this.myCielo();

    const consultTransactionPaymentId: ConsultTransactionPaymentIdRequestModel =
      {
        paymentId: id,
      };

    const response: any = await cielo.consult
      .paymentId(consultTransactionPaymentId)
      .then((res) => {
        // console.log('res: ', res);
        return res;
      })
      .catch((err) => {
        console.log('err: ', err);
      });

    //
    const timestamp = new Date().getTime();
    const message = {
      url: 'req.originalUrl',
      body: response,
      method: 'POST',
      headers: 'req.headers',
      timestamp: timestamp,
    };

    const payload = {
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

    const sellerWallet: any = {
      sellerId: payment.seller,
      amount: payment.amount,
      transaction: payment,
    };

    let wallet = await new this.walletMyModel(sellerWallet).save();

    var obj = wallet.toJSON();

    // insert record transaction

    var walletId: any = wallet._id;

    await this.createTransaction(payment.amount, payment.orderId, walletId);

    return payment;
  }

  async refusePayment(id: string) {
    let payment = await this.paymentMyModel.findOne({ orderId: id });

    payment.status = 'Refused';

    payment = await new this.paymentMyModel(payment).save();

    return payment;
  }

  async createTransaction(amount: number, orderId: string, walletId: string) {
    const transaction = new Transaction();

    const collection: any = {
      amount: amount,
      orderId: orderId,
      walletId: walletId,
    };

    await new this.transactionMyModel(collection).save();
  }
}
