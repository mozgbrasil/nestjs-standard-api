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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CustomerGuard } from './guards/user.guard';
import { DecodeJwt } from '../common/decorators/decode-jwt.decortator';
import { AuthenticatedUser } from '../common/dtos/authenticatedUser.dto';
import { CreatePaymentDto } from 'src/payments/dto/create-payment.dto';
import { PaymentsService } from 'src/payments/payments.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly paymentsService: PaymentsService,
  ) {}

  @Post('mongo-create')
  createMongoRecord(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createMongoRecord(createUserDto);
  }

  @Get('mongo-list')
  findAll() {
    return this.usersService.findMongoRecord();
  }

  @UseGuards(JwtAuthGuard, CustomerGuard)
  @ApiBearerAuth('JWT-auth')
  @Get('/profile')
  findCustomerById(@DecodeJwt() auth: AuthenticatedUser) {
    return this.usersService.findCustomerById(auth._id);
  }

  @UseGuards(JwtAuthGuard, CustomerGuard)
  @ApiBearerAuth('JWT-auth')
  @Post('/payment')
  async createPayment(
    @Body() createPaymentDto: CreatePaymentDto,
    @DecodeJwt() auth: any,
  ) {
    return await this.paymentsService.createPayment(createPaymentDto, auth._id);
  }

  @UseGuards(JwtAuthGuard, CustomerGuard)
  @ApiBearerAuth('JWT-auth')
  @Get('/find-payments')
  findCustomerPayments(@DecodeJwt() auth: AuthenticatedUser) {
    return this.usersService.findCustomerPayments(auth._id);
  }
}
