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
    example: '616082f95fc80d8d555b1d48',
  })
  sellerId: string;

  @ApiProperty({
    description: 'Debit Card',
    example: {
      holder: 'John Doe',
      brand: 'Visa',
      cardNumber: '4929465240388137',
      expirationDate: '06/2023',
      securityCode: '123',
    },
  })
  debitCard: CreateDebitCardDto;
}
