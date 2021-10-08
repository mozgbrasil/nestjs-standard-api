import { Controller, Get } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  // @Post('create')
  // create(@Body() createTransactionDto: CreateTransactionDto) {
  //   return this.transactionsService.create(createTransactionDto);
  // }

  @Get('list')
  findAll() {
    return this.transactionsService.findAll();
  }
}
