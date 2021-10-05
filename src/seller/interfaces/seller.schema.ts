import * as mongoose from 'mongoose';

const jsonSchema = {
  email: { type: String, required: false },
  username: { type: Object, required: false },
  password: { type: String, required: false },
};

export const SellerSchema = new mongoose.Schema(jsonSchema);
