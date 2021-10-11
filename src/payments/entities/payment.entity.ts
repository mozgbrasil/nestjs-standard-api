import { User } from '../../users/entities/user.entity';
import { Seller } from '../../sellers/entities/seller.entity';
import { DebitCard } from './debit-card.entity';
export class Payment {
  orderId: string;
  amount: number;
  status: string;
  customerId: string;
  sellerId: string;
  debitCard: DebitCard;
  created_at: Date;
}
