import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { Types } from 'mongoose';

import { CreateTodoDto, DeleteTodoDto, GetTodoDto } from './interfaces/dto';
import { ITodoGetResponse, ITodoIdResponse } from './interfaces/response';
import { TodoService } from './todo.service';

@Controller()
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @MessagePattern('create')
  public async create(dto: CreateTodoDto): Promise<ITodoIdResponse> {
    const newTodo = await this.todoService.create(dto);
    return { id: newTodo._id };
  }

  @MessagePattern('get_all')
  public async getAll({ owner }: GetTodoDto): Promise<ITodoGetResponse[]> {
    return await this.todoService.searchTodoByOwner(owner);
  }

  @MessagePattern('delete_one')
  public async deleteOne(dto: DeleteTodoDto): Promise<ITodoIdResponse> {
    if (!Types.ObjectId.isValid(dto.todoId)) {
      throw new RpcException({
        error_message: 'TodoId is not valid',
        status: HttpStatus.FORBIDDEN,
      });
    }
    const deletedTodo = await this.todoService.deleteOne(dto);
    if (!deletedTodo) {
      throw new RpcException({
        error_message: 'Is not an owner',
        status: HttpStatus.FORBIDDEN,
      });
    }
    return { id: deletedTodo._id };
  }
}
