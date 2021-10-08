import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ClientProxy } from '@nestjs/microservices';
import RabbitmqServer from '../../common/rabbitmq-server';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    @Inject('RABBIT_PUBLISH_CHANNEL') private readonly client: ClientProxy,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Core Before...: ', __filename);

    const ctx = context.switchToHttp();
    const req = ctx.getRequest();
    const res = ctx.getResponse();

    const timestamp = new Date().getTime();
    const message = {
      url: req.originalUrl,
      body: req.body,
      method: req.method,
      headers: req.headers,
      timestamp: timestamp,
    };

    const payload = {
      pattern: 'create-rmq-channel',
      data: message,
    };

    this.rabbitmqServer(payload);

    //
    // @TODO:
    // "this.client.emit" send in pattern "{ pattern: 'n', data: text: {?}, }", how to use "this.client" to send pattern "{ pattern: 'n', data: {?}, }"
    //
    // this.client.emit<any>('create-rmq-channel', new Message(message));

    const now = Date.now();
    const ret = next.handle().pipe(
      tap(() => {
        setTimeout(() => {
          console.log(`Core After... ${Date.now() - now}ms: `, __filename);
        }, 0);
      }),
    );

    return ret;
  }

  async rabbitmqServer(payload) {
    const server = new RabbitmqServer(process.env.AMQP_URL);
    await server.start();
    await server.publishInQueue(
      process.env.AMQP_QUEUE,
      JSON.stringify(payload),
    );
  }
}
