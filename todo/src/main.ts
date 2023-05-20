import { NestFactory } from '@nestjs/core';
import { Transport, TcpOptions } from '@nestjs/microservices';

import { ConfigService } from './config';
import { TodoModule } from './todo.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(TodoModule, {
    transport: Transport.TCP,
    options: {
      port: new ConfigService().get('port'),
      host: new ConfigService().get('host'),
    },
  } as TcpOptions);
  await app.listen();
}
bootstrap();
