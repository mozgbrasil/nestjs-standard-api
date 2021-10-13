import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './interfaces/user.schema';
import { PaymentSchema } from '../payments/interfaces/payment.schema';
import { PaymentsService } from '../payments/payments.service';
import { WalletSchema } from '../wallets/interfaces/wallet.schema';
import { TransactionSchema } from '../transactions/interfaces/transaction.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SellerSchema } from '../sellers/interfaces/seller.schema';

@Module({
  imports: [
    // Fix: A circular dependency between modules. Use forwardRef() to avoid it
    forwardRef(() => AuthModule),
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
  controllers: [UsersController],
  providers: [UsersService, PaymentsService],
  exports: [UsersService],
})
export class UsersModule {}
