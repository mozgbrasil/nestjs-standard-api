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
    example: '61605ee7d782dd55d81ca4ac',
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
