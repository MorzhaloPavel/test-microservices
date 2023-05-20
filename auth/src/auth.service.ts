import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { InjectModel } from '@nestjs/mongoose/dist';
import { pbkdf2Sync } from 'crypto';
import { Model } from 'mongoose';
import { ConfigService } from './config';
import { SignupDto } from './interfaces/dto';
import { IUser } from './schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel('User') private readonly userModel: Model<IUser>,
  ) {}

  public async createUser(dto: SignupDto): Promise<IUser> {
    return await this.userModel.create(dto);
  }

  public async searchUserById(id: string): Promise<IUser> {
    return this.userModel.findById(id).exec();
  }

  public getEncryptedPassword(password: string): string {
    return pbkdf2Sync(
      password,
      new ConfigService().get('salt'),
      10000,
      512,
      'sha512',
    ).toString('hex');
  }

  public createToken(userId: string): string {
    return this.jwtService.sign({ userId }, { expiresIn: 30 * 24 * 60 * 60 });
  }
}
