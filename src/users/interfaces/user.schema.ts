import * as mongoose from 'mongoose';

const jsonSchema = {
  username: { type: String, required: false },
  email: { type: String, required: false },
  password: { type: String, required: false },
  type: { type: String, required: false },
  payments: { type: String, required: false },
  created_at: { type: String, required: false },
};

export const UserSchema = new mongoose.Schema(jsonSchema);
