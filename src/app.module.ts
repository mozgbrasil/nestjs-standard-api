import { APP_FILTER, APP_PIPE, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { LoggingInterceptor } from './core/interceptors/logging.interceptor';
import {
  Module,
  NestModule,
  MiddlewareConsumer,
  ValidationPipe,
} from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { RolesGuard } from './common/guards/roles.guard';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { CatsModule } from './cats/cats.module';
import { OrdersModule } from './orders/orders.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CatsModule,
    AuthModule,
    ClientsModule.register([
      {
        name: 'HELLO_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.AMQP_URL],
          queue: process.env.AMQP_QUEUE,
          // queueOptions: {
          //   durable: false,
          // },
        },
      },
    ]),
    UsersModule,
    // OrdersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    // {
    //   // Enable authentication globally
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('cats');
  }
}
