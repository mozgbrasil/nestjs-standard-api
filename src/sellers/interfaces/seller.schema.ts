import * as mongoose from 'mongoose';

const jsonSchema = {
  username: { type: String, required: false },
  email: { type: String, required: false },
  password: { type: String, required: false },
  payments: { type: String, required: false },
  accountType: { type: String, required: false },
  created_at: { type: String, required: false },
};

export const SellerSchema = new mongoose.Schema(jsonSchema);
