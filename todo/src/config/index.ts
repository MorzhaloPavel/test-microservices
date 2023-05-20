export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {};
    this.envConfig.port = process.env.TODO_SERVICE_PORT;
    this.envConfig.host = process.env.TODO_SERVICE_HOST;
    this.envConfig.mongoDNS = process.env.MONGO_DSN;
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
