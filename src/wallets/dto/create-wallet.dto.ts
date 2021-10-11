import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateWalletDto {
  @IsString()
  @ApiProperty({
    type: [String],
    description: 'The id of a seller',
    default: '1',
  })
  readonly sellerId: string;

  @IsNumber()
  @ApiProperty({
    type: [Number],
    description: 'The amount of a wallet of user',
    example: '100',
  })
  readonly amount: number;
}
