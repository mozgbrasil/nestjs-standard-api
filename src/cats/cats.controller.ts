import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './entities/cat.entity';
import { CatsService } from './cats.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('cats')
@Controller('cat')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  async getCats(): Promise<Cat[]> {
    return this.catsService.getAll();
  }

  @Get('/name')
  async getByName(@Query('name') name: string): Promise<Cat> {
    return this.catsService.getOneByName(name);
  }

  @Get('/:id')
  async getById(@Param('id') id: string): Promise<Cat> {
    return this.catsService.getOne(id);
  }

  @Post('/new')
  async newCat(@Body() cat: CreateCatDto): Promise<Cat> {
    return this.catsService.insertOne(cat);
  }

  @Patch('/update')
  async updateCat(@Body() cat: CreateCatDto): Promise<Cat> {
    return this.catsService.updateOne(cat);
  }

  @Delete('/delete/:id')
  async deleteCat(@Param('id') id: string): Promise<{ deleted: boolean }> {
    return this.catsService.deleteOne(id);
  }
}
