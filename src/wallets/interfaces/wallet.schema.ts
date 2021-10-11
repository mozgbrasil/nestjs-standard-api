import * as mongoose from 'mongoose';

const jsonSchema = {
  sellerId: { type: String, required: true },
  amount: { type: Number, required: true },
};

export const WalletSchema = new mongoose.Schema(jsonSchema);
