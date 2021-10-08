import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    type: [String],
    description: 'The username of a user',
    default: 'john',
  })
  readonly username: string;

  @ApiProperty({
    description: 'The email of a user',
    example: 'johndoe@gmail.com',
  })
  readonly email: string;

  @IsString()
  @ApiProperty({
    type: [String],
    description: 'The password of a user',
    default: 'changeme',
  })
  readonly password: string;

  @IsString()
  @ApiProperty({
    type: [String],
    description: 'The type of a user',
    default: 'Customer',
  })
  readonly type: string;

  @IsString()
  @ApiProperty({
    type: [String],
    description: 'The created_at of a user',
    default: '2021-10-07T19:55:53.778Z',
  })
  readonly created_at: string;
}
