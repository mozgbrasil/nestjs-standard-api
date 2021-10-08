import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsInt()
  @ApiProperty({
    type: [Number],
    description: 'The amount of a transaction',
    default: '100',
  })
  readonly amount: number;

  @IsString()
  @ApiProperty({
    type: [String],
    description: 'The orderId of a transaction',
    default: '123',
  })
  readonly orderId: string;

  @IsString()
  @ApiProperty({
    type: [String],
    description: 'The walletId a transaction',
    default: '1',
  })
  readonly walletId: string;
}
