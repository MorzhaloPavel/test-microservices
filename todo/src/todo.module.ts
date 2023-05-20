import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigService } from './config';
import { TodoSchema } from './schemas/todo.schema';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '../.env' }),
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: new ConfigService().get('mongoDNS'),
      }),
    }),
    MongooseModule.forFeature([
      {
        name: 'Todo',
        schema: TodoSchema,
        collection: 'todo',
      },
    ]),
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
