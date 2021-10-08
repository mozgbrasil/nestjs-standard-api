import * as mongoose from 'mongoose';

const jsonSchema = {
  sellerId: { type: Number, required: true },
  amount: { type: Number, required: true },
  transaction: { type: String, required: true },
};

export const WalletSchema = new mongoose.Schema(jsonSchema);
