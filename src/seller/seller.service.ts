import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { Seller } from './entities/seller.entity';

@Injectable()
export class SellerService {
  constructor(
    @InjectModel('Seller') private readonly myModel: Model<Seller>, // @InjectModel('Wallet') private readonly myModel: Model<Wallet>, // @InjectModel('Payment') private readonly myModel: Model<Payment>,
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

  // async createSeller(createSellerDto: CreateSellerDto): Promise<Seller> {
  //   const saved = await new this.myModel(createSellerDto).save();

  //   if (!saved) {
  //     throw new RpcException('Problem to create a record');
  //   }
  //   return saved;
  // }
}
