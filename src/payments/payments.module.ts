import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { UserSchema } from '../users/interfaces/user.schema';
import { SellerSchema } from '../sellers/interfaces/seller.schema';
import { PaymentSchema } from './interfaces/payment.schema';
import { WalletSchema } from '../wallets/interfaces/wallet.schema';
import { TransactionSchema } from '../transactions/interfaces/transaction.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Seller', schema: SellerSchema },
      { name: 'Payment', schema: PaymentSchema },
      { name: 'Wallet', schema: WalletSchema },
      { name: 'Transaction', schema: TransactionSchema },
    ]),
    ClientsModule.register([
      {
        name: 'RABBIT_PUBLISH_CHANNEL',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.AMQP_URL],
          queue: process.env.AMQP_QUEUE,
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
