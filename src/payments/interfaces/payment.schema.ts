import * as mongoose from 'mongoose';

const jsonSchema = {
  orderId: { type: String, required: true },
  amount: { type: String, required: true },
  status: { type: String, required: true },
  customer: { type: String, required: true },
  seller: { type: String, required: true },
  debitCard: { type: Object, required: true },
  created_at: { type: String, required: true },
};

export const PaymentSchema = new mongoose.Schema(jsonSchema);
