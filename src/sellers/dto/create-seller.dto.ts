import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSellerDto {
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
    default: 'igno',
  })
  readonly payments: string;

  @IsString()
  @ApiProperty({
    type: [String],
    description: 'The accountType of a user',
    default: 'Seller',
  })
  readonly accountType: string;

  @IsString()
  @ApiProperty({
    type: [String],
    description: 'The created_at of a user',
    default: '2021-10-06',
  })
  readonly created_at: string;
}
