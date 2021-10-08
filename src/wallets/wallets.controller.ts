import { Controller, Get } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('wallets')
@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  // @Post('create')
  // createMongoRecord(@Body() createWalletDto: CreateWalletDto) {
  //   return this.walletsService.createMongoRecord(createWalletDto);
  // }

  @Get('list')
  findAll() {
    return this.walletsService.findMongoRecord();
  }
}
