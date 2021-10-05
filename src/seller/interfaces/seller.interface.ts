import { Document } from 'mongoose';
export interface Seller extends Document {
  readonly email: string;
  readonly username: string;
  readonly password: string;
}
