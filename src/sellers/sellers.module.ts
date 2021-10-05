import { Module } from '@nestjs/common';
import { SellersService } from './sellers.service';
import { SellersController } from './sellers.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { SellerSchema } from './interfaces/seller.schema';
import { WalletSchema } from '../wallets/interfaces/wallet.schema';
import { PaymentSchema } from '../payments/interfaces/payment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Seller', schema: SellerSchema },
      { name: 'Wallet', schema: WalletSchema },
      { name: 'Payment', schema: PaymentSchema },
    ]),
  ],
  controllers: [SellersController],
  providers: [SellersService],
})
export class SellersModule {}
