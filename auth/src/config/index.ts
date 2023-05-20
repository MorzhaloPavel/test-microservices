export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {};
    this.envConfig.port = process.env.AUTH_SERVICE_PORT;
    this.envConfig.host = process.env.AUTH_SERVICE_HOST;
    this.envConfig.mongoDNS = process.env.MONGO_DSN;
    this.envConfig.jwtSecret = process.env.JWT_SECRET;
    this.envConfig.salt = process.env.SALT;
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
