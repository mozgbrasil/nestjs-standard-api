import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  constructor(@InjectModel('Cat') private readonly catMyModel: Model<Cat>) {}

  // private readonly cats: Cat[] = [];

  // create(cat: Cat) {
  //   this.cats.push(cat);
  // }

  // findAll(): Cat[] {
  //   return this.cats;
  // }

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    return await new this.catMyModel(createCatDto).save();
  }

  async findAll(): Promise<Cat[]> {
    return this.catMyModel.find().exec();
  }
}
