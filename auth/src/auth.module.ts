import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigService } from './config';
import { UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '../.env' }),
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: new ConfigService().get('mongoDNS'),
      }),
    }),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: new ConfigService().get('jwtSecret'),
      }),
    }),
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
        collection: 'users',
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
