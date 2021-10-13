import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import {
  CieloConstructor,
  Cielo,
  EnumCardType,
  DebitCardSimpleTransactionRequestModel,
  EnumBrands,
  ConsultTransactionPaymentIdRequestModel,
} from 'cielo';
import { ClientProxy } from '@nestjs/microservices';
import { Payment } from './entities/payment.entity';
import { Transaction } from './entities/transaction.entity';
import { Wallet } from '../wallets/entities/wallet.entity';
import * as uuid from 'uuid';
import { Seller } from '../sellers/entities/seller.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import RabbitmqServer from '../common/rabbitmq-server';
import { User } from '../users/entities/user.entity';

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

    const orderId = uuid.v4();
    const payment = new Payment();
    Object.assign(payment, {
      orderId,
      amount,
      status: 'n/a',
      sellerId: sellerId,
      customerId: customerId,
      debitCard,
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

    Object.assign(payment, {
      transaction: transaction,
      created_at: new Date().toISOString(),
    });

    // await this.paymentMyModel.save(payment); // pg
    await new this.paymentMyModel(payment).save(); // mg

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

    // add amount to wallet

    const wallet = await this.walletMyModel.findOne({
      sellerId: payment.sellerId,
    });

    const sumAmount = +wallet.amount + +payment.amount;

    const filter = { sellerId: payment.sellerId };
    const update = {
      sellerId: payment.sellerId,
      amount: sumAmount,
    };
    const options = {
      new: true,
    };

    const walletModel = await this.walletMyModel.findOneAndUpdate(
      filter,
      update,
      options,
    );

    // insert record transaction

    const walletId: any = walletModel._id;

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
    const getTransaction = await this.transactionMyModel.findOne({
      orderId: orderId,
    });

    if (getTransaction) {
      return getTransaction;
    }

    const collection: any = {
      amount: amount,
      orderId: orderId,
      walletId: walletId,
    };

    const setTransaction = await new this.transactionMyModel(collection).save();

    const items = setTransaction.toJSON();

    return setTransaction;
  }
}
