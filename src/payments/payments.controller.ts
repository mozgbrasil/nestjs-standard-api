import { Controller, Patch, Param, Inject, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CustomerGuard } from '../users/guards/user.guard';

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

  @UseGuards(JwtAuthGuard, CustomerGuard)
  @ApiBearerAuth('JWT-auth')
  @Patch('check/:id')
  async validatePayment(@Param('id') id: string) {
    return await this.paymentsService.validatePayment(id);
  }
}
