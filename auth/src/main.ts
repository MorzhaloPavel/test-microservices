import { NestFactory } from '@nestjs/core';
import { Transport, TcpOptions } from '@nestjs/microservices';

import { ConfigService } from './config';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AuthModule, {
    transport: Transport.TCP,
    options: {
      port: new ConfigService().get('port'),
      host: new ConfigService().get('host'),
    },
  } as TcpOptions);
  await app.listen();
}
bootstrap();
