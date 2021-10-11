import { ConflictException, Injectable } from '@nestjs/common';
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

  async createSeller(createSellerDto: CreateSellerDto): Promise<Seller> {
    const userAlreadyExists = await this.sellerMyModel.findOne({
      where: { email: createSellerDto.email },
    });

    if (userAlreadyExists) {
      throw new ConflictException('This email is already in use');
    }

    const seller = await new this.sellerMyModel(createSellerDto).save();

    if (!seller) {
      throw new RpcException('Problem to create a seller record');
    }

    const wallet = await this.createWallet(seller._id);

    return seller;
  }

  async findSellers() {
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

    const items = result.toJSON();

    return items;
  }

  async findSellerWallet(id: string) {
    const results = await this.sellerMyModel.findOne({ sellerId: id });
    return results;
  }

  async createWallet(id: string) {
    const wallet = new Wallet();

    Object.assign(wallet, {
      sellerId: id,
      amount: 0,
    });

    return await new this.walletMyModel(wallet).save();
  }

  async findSellerTransaction(id: string) {
    const results = await this.sellerMyModel.findOne({ _id: id });
    return results;
  }
}
