import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import {
  CieloConstructor,
  Cielo,
  EnumCardType,
  DebitCardSimpleTransactionRequestModel,
  EnumBrands,
} from 'cielo';

@Injectable()
export class PaymentsService {
  create(createPaymentDto: CreatePaymentDto) {
    return 'This action adds a new payment';
  }

  findAll() {
    return `This action returns all payments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }

  //

  cieloTransaction(createPaymentDto: CreatePaymentDto) {
    async function mainFnc() {
      try {
        var transaction = await cieloDebitCard();
        console.log('Cielo Debit Transaction: ', transaction);
        return transaction;
      } catch (err) {
        console.error('err: ', err);
      }
    }

    //   calling the main function
    var main = mainFnc()
      .then((res) => {
        return res;
      })
      .catch(console.error);

    return main;
  }
}

//

async function cieloDebitCard() {
  const cieloParams: CieloConstructor = {
    merchantId: process.env.MERCHANTID,
    merchantKey: process.env.MERCHANTKEY,
    requestId: 'xxxxxxx', // Opcional - Identificação do Servidor na Cielo
    sandbox: true, // Opcional - Ambiente de Testes
    debug: true, // Opcional - Exibe os dados enviados na requisição para a Cielo
  };

  const cielo = new Cielo(cieloParams);

  const debitCardTransactionParams: DebitCardSimpleTransactionRequestModel = {
    merchantOrderId: '2014121201',
    customer: {
      name: 'Paulo Henrique',
    },
    payment: {
      type: EnumCardType.DEBIT,
      amount: 15700,
      provider: 'Simulado',
      // returnUrl: 'https://nestjs-standard.herokuapp.com/orders/cielo_return/',
      returnUrl: 'http://api.webhookinbox.com/i/lcIICgnZ/in/',
      debitCard: {
        cardNumber: '4532117080573703',
        holder: 'Teste Holder',
        expirationDate: '12/2022',
        securityCode: '023',
        brand: EnumBrands.VISA,
      },
    },
  };

  const transaction = await cielo.debitCard
    .createSimpleTransaction(debitCardTransactionParams)
    .then((res) => {
      console.log('res: ', res);
      return res;
    })
    .catch((err) => {
      var message = err.response;
      console.error('err: ', message);
      return message;
    });

  return transaction;
}
