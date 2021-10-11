import { ApiProperty } from '@nestjs/swagger';
import { CreateDebitCardDto } from './create-debit-card.dto';

export class CreatePaymentDto {
  @ApiProperty({
    description: 'The username of a user',
    default: 'john',
  })
  customerName: string;

  @ApiProperty({
    description: 'Payment amount',
    example: 100.0,
  })
  amount: number;

  @ApiProperty({
    description: 'Seller ID',
    example: '61647fcfe35f00df5d6cf7e3',
  })
  sellerId: string;

  @ApiProperty({
    description: 'Debit Card',
    example: {
      holder: 'John Doe',
      brand: 'Visa',
      cardNumber: '4012001037141112',
      expirationDate: '12/2021',
      securityCode: '123',
    },
  })
  debitCard: CreateDebitCardDto;
}
