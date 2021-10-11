import { Document } from 'mongoose';
export interface Wallet extends Document {
  readonly orderId: string;
  readonly customerId: string;
  readonly sellerId: string;
  readonly amount: number;
  readonly status: string;
  readonly transaction: object;
  readonly created_at: string;
}
