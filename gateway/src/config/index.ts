import { Transport } from '@nestjs/microservices';

export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {};
    this.envConfig.port = process.env.API_GATEWAY_PORT;
    this.envConfig.jwtSecret = process.env.JWT_SECRET;
    this.envConfig.authService = {
      options: {
        port: process.env.AUTH_SERVICE_PORT,
        host: process.env.AUTH_SERVICE_HOST,
      },
      transport: Transport.TCP,
    };
    this.envConfig.todoService = {
      options: {
        port: process.env.TODO_SERVICE_PORT,
        host: process.env.TODO_SERVICE_HOST,
      },
      transport: Transport.TCP,
    };
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
