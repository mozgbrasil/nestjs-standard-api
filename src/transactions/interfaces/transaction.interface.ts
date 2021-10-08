import { Document } from 'mongoose';
export interface Transaction extends Document {
  readonly amount: number;
  readonly orderId: String;
  readonly walletId: number;
}
