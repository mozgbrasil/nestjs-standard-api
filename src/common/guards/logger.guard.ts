import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { Message } from '../../message.event';

// @TODO: Remover
import RabbitmqServer from '../../rabbitmq-server';

async function rabbitmqServer(request) {
  const server = new RabbitmqServer(process.env.AMQP_URL);
  await server.start();
  await server.publishInQueue(process.env.AMQP_QUEUE, JSON.stringify(request));
  // await server.publishInExchange('amq.direct','rota2', JSON.stringify(request.body));
  return request;
}
// @TODO: Remover

@Injectable()
export class LoggerGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = context.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();

    var timestamp = new Date().getTime();
    var request = {
      url: req.originalUrl,
      body: req.body,
      method: req.method,
      headers: req.headers,
      timestamp: timestamp,
    };

    // @TODO: Remover
    var payload = {
      pattern: 'create-company',
      data: request,
    };
    rabbitmqServer(payload);
    // @TODO: Remover

    // @TODO: this.client.emit<any>('create-company', new Message(message));

    return true;
  }
}
