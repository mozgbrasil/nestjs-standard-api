import * as mongoose from 'mongoose';

const jsonSchema = {
  name: { type: String, required: false },
  age: { type: String, required: false },
  breed: { type: String, required: false },
};

export const CatSchema = new mongoose.Schema(jsonSchema);
