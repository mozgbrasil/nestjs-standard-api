import { HttpStatus, HttpException } from '@nestjs/common';

// export class ForbiddenException extends HttpException {
//   constructor() {
//     super('Forbidden', HttpStatus.FORBIDDEN);
//   }
// }

export class ForbiddenException extends HttpException {
  constructor(msg: string) {
    super(
      {
        status: HttpStatus.FORBIDDEN,
        error: msg,
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
