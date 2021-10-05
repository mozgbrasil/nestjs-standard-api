import { Document } from 'mongoose';
export interface Seller extends Document {
  readonly email: string;
  readonly name: string;
  readonly password: string;
}
