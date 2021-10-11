import * as mongoose from 'mongoose';

const jsonSchema = {
  orderId: { type: String, required: true },
  customerId: { type: String, required: true },
  sellerId: { type: String, required: true },
  amount: { type: String, required: true },
  status: { type: String, required: true },
  transaction: { type: Object, required: true },
  created_at: { type: String, required: true },
};

export const PaymentSchema = new mongoose.Schema(jsonSchema);
