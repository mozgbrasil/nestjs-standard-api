import { Document } from 'mongoose';
export interface Seller extends Document {
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly type: string;
  readonly payments: string;
  readonly created_at: string;
}
