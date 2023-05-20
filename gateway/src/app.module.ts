import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';

import { AuthController } from './auth.controller';
import { ConfigService } from './config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TodoController } from './todo.controller';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: '../.env' })],
  controllers: [AuthController, TodoController],
  providers: [
    ConfigService,
    JwtStrategy,
    {
      provide: 'AUTH_SERVICE',
      useFactory: (configService: ConfigService) => {
        const authServiceOptions = configService.get('authService');
        return ClientProxyFactory.create(authServiceOptions);
      },
      inject: [ConfigService],
    },
    {
      provide: 'TODO_SERVICE',
      useFactory: (configService: ConfigService) => {
        const todoServiceOptions = configService.get('todoService');
        return ClientProxyFactory.create(todoServiceOptions);
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
