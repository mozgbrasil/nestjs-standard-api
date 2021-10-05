import { ConflictException, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as uuid from 'uuid';
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
    // return 'This action adds a new seller';
    const saved = await new this.sellerMyModel(createSellerDto).save();

    if (!saved) {
      throw new RpcException('Problem to create a record');
    }
    return saved;
  }

  async createSeller({ name, email, password }: CreateSellerDto) {
    const userAlreadyExists = await this.sellerMyModel.findOne({
      where: { email: email },
    });

    if (userAlreadyExists) {
      // throw new ConflictException('This email is already in use');
    }

    const seller = new Seller();

    const id = uuid.v4();

    const wallet = await this.createWallet(name);

    // const saltOrRounds = 10;
    // password = await bcrypt.hash(password, saltOrRounds);

    // Object.assign(seller, {
    //   id,
    //   name,
    //   email,
    //   password,
    //   wallet,
    // });

    // await this.sellerMyModel.save(seller);
  }

  // async findSellerPayments(id: string) {
  //   const seller = await this.sellerMyModel.findOne(id);

  //   const payments = await this.paymentMyModel.find({
  //     where: { seller: seller },
  //   });

  //   const paymentsReturn = payments.map(
  //     ({ seller, customer, debitCard, ...paymentsReturn }) => paymentsReturn,
  //   );

  //   return paymentsReturn;
  // }

  // async findSellerById(id: string) {
  //   const seller = await this.sellerMyModel.findOne(id);

  //   const { password, wallet, ...sellerReturn } = seller;

  //   return sellerReturn;
  // }

  // async findSellerWallet(id: string) {
  //   const seller = await this.sellerMyModel.findOne(id);

  //   return seller.wallet;
  // }

  async createWallet(sellerName: string) {
    const saved = await new this.walletMyModel(CreateWalletDto).save();

    if (!saved) {
      throw new RpcException('Problem to create a record');
    }
    return saved;
  }
}
