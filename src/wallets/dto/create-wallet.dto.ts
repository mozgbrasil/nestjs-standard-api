import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateWalletDto {
  @IsString()
  @ApiProperty({
    type: [String],
    description: 'The id of a seller',
    default: '1',
  })
  readonly id: string;

  @ApiProperty({
    description: 'The amount of a transaction',
    example: '100',
  })
  amount: string;

  @IsString()
  @ApiProperty({
    type: [String],
    description: 'The transaction',
    default: 'x1s452s',
  })
  readonly transaction: string;
}
