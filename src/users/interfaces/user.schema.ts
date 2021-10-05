import * as mongoose from 'mongoose';

const jsonSchema = {
  email: { type: String, required: false },
  name: { type: String, required: false },
  password: { type: String, required: false },
};

export const UserSchema = new mongoose.Schema(jsonSchema);
