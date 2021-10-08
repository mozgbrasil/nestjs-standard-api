import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  // @Post('mongo-create')
  // create(@Body() createTransactionDto: CreateTransactionDto) {
  //   return this.transactionsService.create(createTransactionDto);
  // }

  @Get('mongo-list')
  findAll() {
    return this.transactionsService.findAll();
  }
}
