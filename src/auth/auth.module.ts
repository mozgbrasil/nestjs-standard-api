import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { CustomerStrategy } from './strategies/customer-strategy';
import { SellerStrategy } from './strategies/seller-strategy';
import { UsersModule } from '../users/users.module';
import { UserSchema } from '../users/interfaces/user.schema';
import { SellerSchema } from '../sellers/interfaces/seller.schema';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '6000s' },
    }),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Seller', schema: SellerSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    CustomerStrategy,
    SellerStrategy,
    JwtStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
