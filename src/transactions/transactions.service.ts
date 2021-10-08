import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from 'src/payments/entities/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel('Transaction')
    private readonly transactionMyModel: Model<Transaction>,
  ) {}

  async create(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    const result = await new this.transactionMyModel(
      createTransactionDto,
    ).save();

    if (!result) {
      throw new RpcException('Problem to create a record');
    }
    return result;
  }

  async findAll() {
    const results = await this.transactionMyModel.find({});
    if (!results) {
      throw new RpcException('Problem to list a record');
    }
    return results;
  }
}
