import { Document } from 'mongoose';
export interface Wallet extends Document {
  readonly sellerId: string;
  readonly amount: number;
}
