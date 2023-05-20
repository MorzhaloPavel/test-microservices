import mongoose, { Types } from 'mongoose';

export interface IUser extends mongoose.Document<Types.ObjectId> {
  password: string;
}

export const UserSchema = new mongoose.Schema<IUser>(
  {
    password: {
      type: String,
      required: [true, 'Password can not be empty'],
    },
  },
  { versionKey: false },
);
