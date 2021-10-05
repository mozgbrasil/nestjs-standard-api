import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateWalletDto {
  @IsNumber()
  @ApiProperty({
    type: [Number],
    description: 'The id of a seller',
    default: '1',
  })
  readonly id_seller: number;

  @IsString()
  @ApiProperty({
    description: 'The amount of a transaction',
    example: '100',
  })
  readonly amount: string;

  @IsString()
  @ApiProperty({
    type: [String],
    description: 'The transaction',
    default: 'x1s452s',
  })
  readonly transaction: string;
}
