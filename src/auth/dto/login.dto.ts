import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'The username of a user',
    default: 'John Doe',
  })
  username: string;

  @ApiProperty({
    description: 'The password of a user',
    default: '123456a',
  })
  password: string;
}
