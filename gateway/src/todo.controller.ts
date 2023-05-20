import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  Req,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from './guards/jwt.guard';
import { IAuthorizedRequest } from './interfaces/common/authorized-request.interface';
import { CustomException } from './exception/custom-exception';
import { CreateTodoDto } from './interfaces/todo/dto';
import { ITodoGetResponse, ITodoIdResponse } from './interfaces/todo/response';

@UseGuards(JwtAuthGuard)
@Controller('/todo')
export class TodoController {
  constructor(
    @Inject('TODO_SERVICE') private readonly todoServiceClient: ClientProxy,
  ) {}

  @Post('/create')
  public async create(
    @Req() request: IAuthorizedRequest,
    @Body() dto: CreateTodoDto,
  ): Promise<ITodoIdResponse> {
    const userInfo = request.user;
    return await firstValueFrom(
      this.todoServiceClient.send('create', { ...dto, owner: userInfo.userId }),
    );
  }

  @Get('/get')
  public async getAll(
    @Req() request: IAuthorizedRequest,
  ): Promise<ITodoGetResponse> {
    const userInfo = request.user;
    return await firstValueFrom(
      this.todoServiceClient.send('get_all', { owner: userInfo.userId }),
    );
  }

  @Delete('/delete/:todoId')
  public async deleteOne(
    @Req() request: IAuthorizedRequest,
    @Param('todoId') todoId: string,
  ): Promise<ITodoIdResponse> {
    const userInfo = request.user;
    try {
      return await firstValueFrom(
        this.todoServiceClient.send('delete_one', {
          owner: userInfo.userId,
          todoId,
        }),
      );
    } catch (error) {
      throw new CustomException(error);
    }
  }
}
