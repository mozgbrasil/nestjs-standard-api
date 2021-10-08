import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CustomerGuard } from 'src/users/guards/user.guard';
import { DecodeJwt } from 'src/common/decorators/decode-jwt.decortator';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    @Inject('RABBIT_PUBLISH_CHANNEL')
    private readonly publishChannel: ClientProxy,
  ) {}

  // @UseGuards(JwtAuthGuard, CustomerGuard)
  // @ApiBearerAuth('JWT-auth')
  // @Post()
  // async createPayment(
  //   @Body() createPaymentDto: CreatePaymentDto,
  //   @DecodeJwt() auth: any,
  // ) {
  //   return await this.paymentsService.createPayment(createPaymentDto, auth._id);
  // }

  // @ApiBearerAuth('JWT-auth')
  @Patch('check/:id')
  async validatePayment(@Param('id') id: string) {
    return await this.paymentsService.validatePayment(id);
  }
}
