import mongoose, { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist';

import { CreateTodoDto, DeleteTodoDto } from './interfaces/dto';
import { ITodo } from './schemas/todo.schema';
import { ITodoGetResponse } from './interfaces/response';

@Injectable()
export class TodoService {
  constructor(@InjectModel('Todo') private readonly todoModel: Model<ITodo>) {}

  public async create(dto: CreateTodoDto): Promise<ITodo> {
    return await this.todoModel.create({
      ...dto,
      owner: new mongoose.Types.ObjectId(dto.owner),
    });
  }

  public async searchTodoByOwner(owner: string): Promise<ITodoGetResponse[]> {
    return this.todoModel.aggregate([
      { $match: { owner: new mongoose.Types.ObjectId(owner) } },
      { $project: { id: '$_id', title: 1, description: 1, _id: 0 } },
    ]);
  }

  public async deleteOne(dto: DeleteTodoDto): Promise<ITodo> {
    return await this.todoModel.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(dto.todoId),
      owner: new mongoose.Types.ObjectId(dto.owner),
    });
  }
}
