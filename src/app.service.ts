import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // getHello(): string {
  getHello() {
    const data = new Date();
    const message = 'Hello World! ' + `(${data})`;
    return { message: message };
  }
}
