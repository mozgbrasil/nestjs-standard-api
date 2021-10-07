import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

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
    description: 'The payments of a user',
    default: 'cielo',
  })
  readonly payments: string;

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
    default: '2021-10-06',
  })
  readonly created_at: string;
}
