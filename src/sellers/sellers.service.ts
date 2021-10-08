import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSellerDto } from './dto/create-seller.dto';
import { Seller } from './entities/seller.entity';
import { Payment } from '../payments/entities/payment.entity';
import { Wallet } from '../wallets/entities/wallet.entity';
import { CreateWalletDto } from '../wallets/dto/create-wallet.dto';

@Injectable()
export class SellersService {
  constructor(
    @InjectModel('Seller') private readonly sellerMyModel: Model<Seller>,
    @InjectModel('Wallet') private readonly walletMyModel: Model<Wallet>,
    @InjectModel('Payment') private readonly paymentMyModel: Model<Payment>,
  ) {}

  async createMongoRecord(createSellerDto: CreateSellerDto): Promise<Seller> {
    const result = await new this.sellerMyModel(createSellerDto).save();

    if (!result) {
      throw new RpcException('Problem to create a record');
    }
    return result;
  }

  async findMongoRecord() {
    const results = await this.sellerMyModel.find({});
    if (!results) {
      throw new RpcException('Problem to list a record');
    }
    return results;
  }

  async findSellerPayments(id: string) {
    const seller = await this.sellerMyModel.findOne({ _id: id });
    const payments = await this.paymentMyModel.find({
      where: { seller: seller },
    });

    return payments;
  }

  async findSellerById(id: string) {
    const result = await this.sellerMyModel.findOne({ _id: id });

    const obj = result.toJSON();

    return obj;
  }

  async findSellerWallet(id: string) {
    const results = await this.sellerMyModel.findOne({ sellerId: id });
    return results;
  }

  async findSellerTransaction(id: string) {
    const results = await this.sellerMyModel.findOne({ _id: id });
    return results;
  }
}
