import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { Wallet } from './entities/wallet.entity';

@Injectable()
export class WalletsService {
  constructor(
    @InjectModel('Wallet') private readonly walletMyModel: Model<Wallet>,
  ) {}

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
