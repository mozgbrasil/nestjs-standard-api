import { Controller, Patch, Param, Inject, Post, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';

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

  @Post('return')
  async cieloPaymentReturn(@Body() body) {
    return await this.paymentsService.cieloPaymentReturn(body);
  }
}
