import { Module } from '@nestjs/common';
import { AppController } from './todo.controller';
import { AppService } from './todo.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
