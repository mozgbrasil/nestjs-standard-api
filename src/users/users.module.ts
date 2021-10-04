import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  //imports: [AuthModule],
// Fix: A circular dependency between modules. Use forwardRef() to avoid it
imports: [forwardRef(() => AuthModule)],
  exports: [UsersService],
})
export class UsersModule {}
