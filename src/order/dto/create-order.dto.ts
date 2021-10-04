import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateOrderDto {
  // @IsString()
  // @ApiProperty({
  //   description: 'The id of a payment',
  //   minimum: 1,
  //   default: 1,
  // })
  // readonly paymentId: number;

  // @IsString()
  // @ApiProperty({
  //   type: [String],
  //   description: 'The name of a payment',
  //   default: 'John Doe',
  // })
  // readonly name: string;
  products: {
    product: string;
    quantity: number;
  }[];
}
