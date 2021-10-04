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
import { Message } from '../../message.event';

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

    var timestamp = new Date().getTime();
    var message = {
      url: req.originalUrl,
      body: req.body,
      method: req.method,
      headers: req.headers,
      timestamp: timestamp,
    };

    this.client.emit<any>('create-rmq-channel', new Message(message));

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
}
