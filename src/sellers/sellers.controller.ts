import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SellersService } from './sellers.service';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SellerGuard } from './guards/seller.guard';
import { DecodeJwt } from '../common/decorators/decode-jwt.decortator';
import { AuthenticatedUser } from '../common/dtos/authenticatedUser.dto';

@ApiTags('sellers')
@Controller('sellers')
export class SellersController {
  constructor(private readonly sellersService: SellersService) {}

  // @Post()
  // create(@Body() createSellerDto: CreateSellerDto) {
  //   return this.sellersService.create(createSellerDto);
  // }

  // @Get()
  // findAll() {
  //   return this.sellersService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.sellersService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSellerDto: UpdateSellerDto) {
  //   return this.sellersService.update(+id, updateSellerDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.sellersService.remove(+id);
  // }

  //

  @Post('mongo-create')
  createMongoRecord(@Body() createSellerDto: CreateSellerDto) {
    return this.sellersService.createMongoRecord(createSellerDto);
  }

  @Get('mongo-list')
  findAll() {
    return this.sellersService.findMongoRecord();
  }

  @UseGuards(JwtAuthGuard, SellerGuard)
  @ApiBearerAuth('JWT-auth')
  @Get('profile')
  findSellerById(@DecodeJwt() auth: AuthenticatedUser) {
    return this.sellersService.findSellerById(auth._id);
  }

  @Post('create 🛑️')
  createSeller(@Body() createSellerDto: CreateSellerDto) {
    return this.sellersService.createSeller(createSellerDto);
  }

  @UseGuards(JwtAuthGuard, SellerGuard)
  @ApiBearerAuth('JWT-auth')
  @Get('payments 🛑️')
  findSellerPayments(@DecodeJwt() auth: AuthenticatedUser) {
    return this.sellersService.findSellerPayments(auth._id);
  }

  @UseGuards(JwtAuthGuard, SellerGuard)
  @ApiBearerAuth('JWT-auth')
  @Get('wallet 🛑️')
  findSellerWallet(@DecodeJwt() auth: AuthenticatedUser) {
    return this.sellersService.findSellerWallet(auth._id);
  }
}
