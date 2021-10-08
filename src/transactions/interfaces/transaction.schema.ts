import * as mongoose from 'mongoose';

const jsonSchema = {
  amount: { type: Number, required: true },
  orderId: { type: String, required: true },
  walletId: { type: String, required: true },
};

export const TransactionSchema = new mongoose.Schema(jsonSchema);
