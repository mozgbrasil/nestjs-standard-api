import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSellerDto {
  @IsString()
  @ApiProperty({
    type: [String],
    description: 'The username of a user',
    default: 'ACME Corporation',
  })
  readonly username: string;

  @ApiProperty({
    description: 'The email of a user',
    example: 'acme@gmail.com',
  })
  readonly email: string;

  @IsString()
  @ApiProperty({
    type: [String],
    description: 'The password of a user',
    default: '123456a',
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
    default: 'Seller',
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
