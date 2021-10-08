import { Document } from 'mongoose';
export interface Transaction extends Document {
  readonly amount: number;
  readonly orderId: string;
  readonly walletId: string;
}
