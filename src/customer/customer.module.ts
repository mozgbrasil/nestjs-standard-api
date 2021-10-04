import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService],
  imports: [AuthModule],
  exports: [CustomerService],
})
export class CustomerModule {}
