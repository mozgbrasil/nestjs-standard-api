import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSellerDto {
  @IsString()
  @ApiProperty({
    type: [String],
    description: 'The name of a user',
    default: 'John Doe',
  })
  readonly name: string;

  @ApiProperty({
    description: 'The email of a user',
    example: 'johndoe@gmail.com',
  })
  email: string;

  @IsString()
  @ApiProperty({
    type: [String],
    description: 'The password of a user',
    default: '123456a',
  })
  readonly password: string;
}
