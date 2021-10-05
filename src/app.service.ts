import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // getHello(): string {
  getHello() {
    var data = new Date();
    var message = 'Hello World! ' + `(${data})`;
    return { message: message };
  }
}
