import { ConflictException, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
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

  create(createSellerDto: CreateSellerDto) {
    return 'This action adds a new seller';
  }

  findAll() {
    return `This action returns all seller`;
  }

  findOne(id: number) {
    return `This action returns a #${id} seller`;
  }

  update(id: number, updateSellerDto: UpdateSellerDto) {
    return `This action updates a #${id} seller`;
  }

  remove(id: number) {
    return `This action removes a #${id} seller`;
  }

  //

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
    // const seller = await this.sellerMyModel.findOne(id);
    // const payments = await this.paymentMyModel.find({
    //   where: { seller: seller },
    // });
    // const paymentsReturn = payments.map(
    //   ({ seller, customer, debitCard, ...paymentsReturn }) => paymentsReturn,
    // );
    // return paymentsReturn;
  }

  async findSellerById(id: string) {
    const result = await this.sellerMyModel.findOne({ _id: id });

    var obj = result.toJSON();

    return obj;
  }

  async findSellerWallet(id: string) {
    // const seller = await this.sellerMyModel.findOne(id);
    // return seller.wallet;
  }

  async createWallet(sellerName: string) {
    const saved = await new this.walletMyModel(CreateWalletDto).save();

    if (!saved) {
      throw new RpcException('Problem to create a record');
    }
    return saved;
  }
}
