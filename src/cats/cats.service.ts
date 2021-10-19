import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './entities/cat.entity';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CatsService {
  constructor(
    @InjectModel('Cat') private readonly catMyModel: Model<Cat>,
    @InjectRepository(Cat) private readonly catMyRepository: Repository<Cat>,
  ) {}

  // private readonly cats: Cat[] = [];

  // create(cat: Cat) {
  //   this.cats.push(cat);
  // }

  // findAll(): Cat[] {
  //   return this.cats;
  // }

  async getAll(): Promise<Cat[]> {
    return this.catMyRepository.find();
  }

  async getOne(id: string): Promise<Cat> {
    return this.catMyRepository.findOneOrFail({ id });
  }

  async getOneByName(name: string): Promise<Cat> {
    return this.catMyRepository.findOneOrFail({ name });
  }

  async insertOne(createCatDto: CreateCatDto): Promise<Cat> {
    const expr: string = 'TypeOrm';
    switch (expr) {
      case 'Mongoose':
        return await new this.catMyModel(createCatDto).save();
        break;
      case 'TypeOrm':
        const newCat = this.catMyRepository.create(createCatDto);
        await this.catMyRepository.save(newCat);
        return newCat;
        break;
      default:
        console.log(`Sorry, we are out of ${expr}.`);
    }
  }

  async updateOne(cat: CreateCatDto): Promise<Cat> {
    const { id } = cat;
    await this.catMyRepository.update({ id }, cat);
    return this.getOne(id);
  }

  async deleteOne(id: string): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.catMyRepository.delete({ id });
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }
}
