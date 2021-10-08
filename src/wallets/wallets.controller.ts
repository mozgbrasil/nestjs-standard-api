import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('wallets')
@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  // @Post('mongo-create')
  // createMongoRecord(@Body() createWalletDto: CreateWalletDto) {
  //   return this.walletsService.createMongoRecord(createWalletDto);
  // }

  @Get('mongo-list')
  findAll() {
    return this.walletsService.findMongoRecord();
  }
}
