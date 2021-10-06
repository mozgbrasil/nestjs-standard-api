import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { Wallet } from './entities/wallet.entity';

@Injectable()
export class WalletsService {
  constructor(
    @InjectModel('Wallet') private readonly walletMyModel: Model<Wallet>,
  ) {}

  create(createWalletDto: CreateWalletDto) {
    return 'This action adds a new wallet';
  }

  findAll() {
    return `This action returns all wallets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} wallet`;
  }

  update(id: number, updateWalletDto: UpdateWalletDto) {
    return `This action updates a #${id} wallet`;
  }

  remove(id: number) {
    return `This action removes a #${id} wallet`;
  }

  //

  async createMongoRecord(createWalletDto: CreateWalletDto): Promise<Wallet> {
    const saved = await new this.walletMyModel(createWalletDto).save();

    if (!saved) {
      throw new RpcException('Problem to create a record');
    }
    return saved;
  }

  async findMongoRecord() {
    const results = await this.walletMyModel.find({});
    if (!results) {
      throw new RpcException('Problem to list a record');
    }
    return results;
  }
}
