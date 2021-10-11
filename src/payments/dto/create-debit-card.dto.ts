import { ApiProperty } from '@nestjs/swagger';

export class CreateDebitCardDto {
  @ApiProperty({
    description: 'Titular do cartão',
    default: 'John Doe',
  })
  holder: string;

  @ApiProperty({
    description: 'Bandeira',
    example: 'Visa',
  })
  brand: string;

  @ApiProperty({
    description: 'Numero',
    example: '4012001037141112',
  })
  cardNumber: string;

  @ApiProperty({
    description: 'Validade',
    example: '06/2023',
  })
  expirationDate: string;

  @ApiProperty({
    description: 'CVV do cartão',
    example: '123',
  })
  securityCode: string;
}
