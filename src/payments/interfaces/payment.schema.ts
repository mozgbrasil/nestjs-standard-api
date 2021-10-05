import * as mongoose from 'mongoose';

const jsonSchema = {
  orderId: { type: String, required: false },
  amount: { type: String, required: false },
  status: { type: String, required: false },
  customer: { type: String, required: false },
  seller: { type: String, required: false },
  debitCard: { type: String, required: false },
  created_at: { type: String, required: false },
};

export const PaymentSchema = new mongoose.Schema(jsonSchema);
