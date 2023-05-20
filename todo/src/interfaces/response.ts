import { Types } from 'mongoose';
import { ITodo } from '../schemas/todo.schema';

export interface ITodoIdResponse {
  id: Types.ObjectId;
}

export interface ITodoGetResponse extends Pick<ITodo, 'title' | 'description'> {
  id: Types.ObjectId;
}
