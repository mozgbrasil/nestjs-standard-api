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

  @Inject('RABBIT_PUBLISH_CHANNEL')
  private readonly publishChannel: ClientProxy;

  async create(
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
    // payment = await this.paymentMyModel.save(payment); // pg
    payment = await new this.paymentMyModel(payment).save(); // mg

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
        console.log('res: ', res);

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

    return transaction;
  }

  // async validatePayment(id: string) {
  //   const response = await axios
  //     .get(`${cieloURLGet}${id}`, cieloHeaderConfig)
  //     .then(function (response) {
  //       return response;
  //     })
  //     .catch(function (error) {
  //       throw new HttpException('Payment Not Found', error.response.status);
  //     });

  //   const httpLogDTO: HttpLogDTO = {
  //     url: cieloURLPost,
  //     method: 'GET',
  //     headers: cieloHeaderConfig,
  //     body: {},
  //   };

  //   this.publishChannel.sendToQueue(
  //     rabbitMqQueue,
  //     Buffer.from(JSON.stringify(httpLogDTO)),
  //     {
  //       persistent: true,
  //     },
  //   );

  //   const orderId = response.data.MerchantOrderId;

  //   console.log(orderId);

  //   if (response.data.Payment.Status === 2) {
  //     return await this.approvePayment(orderId);
  //   }
  //   return await this.refusePayment(orderId);
  // }

  // async approvePayment(id: string) {
  //   /**Mudando o status do pagamento*/
  //   console.log(id);
  //   let payment = await this.paymentRepository.findOne(id);
  //   payment.status = 'Approved';

  //   payment = await this.paymentRepository.save(payment);

  //   /**Adicionando valor a carteira*/
  //   const sellerWallet = payment.seller.wallet;
  //   sellerWallet.amount += payment.amount;

  //   await this.walletRepository.save(sellerWallet);

  //   /**Salvando a transação*/

  //   await this.createTransaction(payment.amount, payment.orderId, sellerWallet);

  //   const { customer, seller, debitCard, ...paymentReturn } = payment;

  //   console.log(payment);

  //   return paymentReturn;
  // }

  // async refusePayment(id: string) {
  //   console.log(id);
  //   let payment = await this.paymentRepository.findOne(id);
  //   payment.status = 'Refused';

  //   payment = await this.paymentRepository.save(payment);

  //   const { customer, seller, debitCard, ...paymentReturn } = payment;

  //   return paymentReturn;
  // }

  // async createTransaction(amount: number, orderId: string, wallet: Wallet) {
  //   const transaction = new Transaction();

  //   const id = uuid.v4();

  //   Object.assign(transaction, {
  //     id,
  //     amount,
  //     orderId,
  //     wallet,
  //   });

  //   this.transactionRepository.save(transaction);
  // }

  //
}
