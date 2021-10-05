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
import { SellerService } from './seller.service';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { SellerGuard } from './guards/seller.guard';
import { DecodeJwt } from '../common/decorators/decode-jwt.decortator';
import { AuthenticatedUser } from '../common/dtos/authenticatedUser.dto';

@ApiTags('seller')
@Controller('seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @Get()
  findAll() {
    return this.sellerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sellerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSellerDto: UpdateSellerDto) {
    return this.sellerService.update(+id, updateSellerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sellerService.remove(+id);
  }

  //

  @ApiOperation({
    summary: 'Seller account create',
    description: 'Create a new Seller account',
  })
  @ApiCreatedResponse({ description: 'Seller account created' })
  @Post()
  create(@Body() createSellerDto: CreateSellerDto) {
    return this.sellerService.create(createSellerDto);
  }

  // @UseGuards(JwtAuthGuard, SellerGuard)
  // @ApiOperation({
  //   summary: "Show seller's profile",
  //   description: "Get basic seller's informations",
  // })
  // // @ApiOkResponse({
  // //   description: "Return seller's profile",
  // //   schema: SellerProfileResponseSchema,
  // // })
  // @ApiUnauthorizedResponse({ description: 'Invalid Token' })
  // @ApiBearerAuth('JWT-auth')
  // @Get('profile')
  // findSellerById(@DecodeJwt() auth: AuthenticatedUser) {
  //   return this.sellerService.findSellerById(auth.id);
  // }

  // @UseGuards(JwtAuthGuard, SellerGuard)
  // @ApiOperation({
  //   summary: "Show all seller's payments",
  //   description: "Get all seller's payments",
  // })
  // // @ApiOkResponse({
  // //   description: 'Return all seller payments',
  // //   schema: GetSellerPaymentsResponseSchema,
  // // })
  // @ApiUnauthorizedResponse({ description: 'Invalid Token' })
  // @ApiBearerAuth('JWT-auth')
  // @Get('payments')
  // findSellerPayments(@DecodeJwt() auth: AuthenticatedUser) {
  //   return this.sellerService.findSellerPayments(auth.id);
  // }

  // @UseGuards(JwtAuthGuard, SellerGuard)
  // @ApiOperation({
  //   summary: "Show seller's wallet",
  //   description: "Get the seller's wallet",
  // })
  // // @ApiOkResponse({
  // //   description: "Return seller's wallet",
  // //   schema: SellerWalletResponse,
  // // })
  // @ApiUnauthorizedResponse({ description: 'Invalid Token' })
  // @ApiBearerAuth('JWT-auth')
  // @Get('wallet')
  // findSellerWallet(@DecodeJwt() auth: AuthenticatedUser) {
  //   return this.sellerService.findSellerWallet(auth.id);
  // }
}
