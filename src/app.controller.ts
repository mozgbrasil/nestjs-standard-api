import { Controller, Get, Inject } from '@nestjs/common';
// import { AppService } from "./app.service";
import { ClientProxy } from '@nestjs/microservices';
import { Message } from './message.event';

@Controller()
export class AppController {
  constructor(
    // private readonly appService: AppService,
    @Inject('HELLO_SERVICE') private readonly client: ClientProxy,
  ) {}

  async onApplicationBootstrap() {
    //await this.client.connect();
  }

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Get()
  getHello() {
    var data = new Date();
    var message = 'Hello World ' + `(${data})`;
    // this.client.emit<any>("message_printed", new Message(message));
    this.client.emit<any>('create-company', new Message(message));
    return message;
  }
}
