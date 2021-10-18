import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CatSchema } from './schemas/cat.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';

@Module({
  imports: [
    // MongooseModule.forFeature([{ name: 'Cat', schema: CatSchema }]),
    TypeOrmModule.forFeature([Cat]),
  ],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
