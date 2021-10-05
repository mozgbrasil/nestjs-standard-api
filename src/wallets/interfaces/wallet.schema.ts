import * as mongoose from 'mongoose';

const jsonSchema = {
  id: { type: String, required: false },
  amount: { type: String, required: false },
  transaction: { type: String, required: false },
};

export const WalletSchema = new mongoose.Schema(jsonSchema);
