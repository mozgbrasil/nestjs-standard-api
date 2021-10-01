import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { Message } from '../../message.event';

@Injectable()
export class LoggerGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = context.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();

    var timestamp = new Date().getTime();
    var logHttp = {
      url: req.originalUrl,
      body: req.body,
      method: req.method,
      headers: req.headers,
      timestamp: timestamp,
    };

    return true;
  }
}
