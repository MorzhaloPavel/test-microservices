import mongoose, { Types } from 'mongoose';

export interface ITodo extends mongoose.Document<Types.ObjectId> {
  owner: Types.ObjectId;
  title: string;
  description: string;
}

export const TodoSchema = new mongoose.Schema<ITodo>(
  {
    owner: Types.ObjectId,
    title: { type: String, default: '' },
    description: { type: String, default: '' },
  },
  { versionKey: false },
);
