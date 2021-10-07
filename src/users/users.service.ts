import { ConflictException, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment } from '../payments/entities/payment.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
// class/interface representing a user entity
export type LocalUser = any;
@Injectable()
export class UsersService {
  @InjectModel('User') private readonly userMyModel: Model<User>;
  @InjectModel('Payment') private readonly paymentMyModel: Model<Payment>;

  private readonly users: LocalUser[];

  constructor() {
    // @InjectModel('User') private readonly userMyModel: Model<User>
    this.users = [
      {
        userId: 1,
        username: 'john',
        password: 'changeme',
        email: 'johndoe@gmail.com',
        type: 'Customer',
        payments: 'payments',
        created_at: '2021-10-06',
      },
      {
        userId: 2,
        username: 'chris',
        password: 'secret',
        email: 'johndoe@gmail.com',
        type: 'Customer',
        payments: 'payments',
        created_at: '2021-10-06',
      },
      {
        userId: 3,
        username: 'maria',
        password: 'guess',
        email: 'johndoe@gmail.com',
        type: 'Customer',
        payments: 'payments',
        created_at: '2021-10-06',
      },
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async createMongoRecord(createUserDto: CreateUserDto): Promise<User> {
    const result = await new this.userMyModel(createUserDto).save();
    if (!result) {
      throw new RpcException('Problem to create a record');
    }
    return result;
  }

  async findMongoRecord() {
    const results = await this.userMyModel.find({});
    if (!results) {
      throw new RpcException('Problem to list a record');
    }
    return results;
  }

  async findCustomerById(id: any) {
    const result = await this.userMyModel.findOne({ _id: id });

    var obj = result.toJSON();

    return obj;
  }

  async findCustomerPayments(id: any) {
    const customer = await this.userMyModel.findOne({ _id: id });
    const payments = await this.paymentMyModel.find({
      where: { customer: customer },
    });
    return payments;
  }
}
