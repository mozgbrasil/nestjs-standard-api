import {
  Module,
  NestModule,
  MiddlewareConsumer,
  ValidationPipe,
} from '@nestjs/common';
import { APP_PIPE, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { LoggingInterceptor } from './core/interceptors/logging.interceptor';
import { RolesGuard } from './common/guards/roles.guard';
import { UsersModule } from './users/users.module';
import { CatsModule } from './cats/cats.module';
import { SellersModule } from './sellers/sellers.module';
import { PaymentsModule } from './payments/payments.module';
import { WalletsModule } from './wallets/wallets.module';
import { TransactionsModule } from './transactions/transactions.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      // useCreateIndex: true,
      useUnifiedTopology: true,
      // useFindAndModify: false,
    }),
    AuthModule,
    ClientsModule.register([
      {
        name: 'RABBIT_PUBLISH_CHANNEL',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.AMQP_URL],
          queue: process.env.AMQP_QUEUE,
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    UsersModule,
    SellersModule,
    PaymentsModule,
    WalletsModule,
    TransactionsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.TYPE_ORM_HOST,
      port: 3306,
      username: process.env.TYPE_ORM_USERNAME,
      password: process.env.TYPE_ORM_PASSWORD,
      database: process.env.TYPE_ORM_DATABASE,
      synchronize: true,
      entities: [__dirname + '/**/*.entity.{ts,js}'],
    }),
    CatsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_FILTER,
    //   useClass: HttpExceptionFilter,
    // },
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
