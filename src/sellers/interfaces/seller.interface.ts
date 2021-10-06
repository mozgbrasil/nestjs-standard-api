import { Document } from 'mongoose';
export interface Seller extends Document {
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly payments: string;
  readonly accountType: string;
  readonly created_at: string;
}
