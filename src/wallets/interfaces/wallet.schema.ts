import * as mongoose from 'mongoose';

const jsonSchema = {
  id_seller: { type: Number, required: true },
  amount: { type: String, required: false },
  transaction: { type: String, required: false },
};

export const WalletSchema = new mongoose.Schema(jsonSchema);
