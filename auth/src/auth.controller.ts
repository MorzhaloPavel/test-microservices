import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { Types } from 'mongoose';

import { AuthService } from './auth.service';
import { SigninDto, SignupDto } from './interfaces/dto';
import {
  IAuthSigninResponse,
  IAuthSignupResponse,
} from './interfaces/response';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('signup')
  public async signup({ password }: SignupDto): Promise<IAuthSignupResponse> {
    const passwordHash = this.authService.getEncryptedPassword(password);
    const newUser = await this.authService.createUser({
      password: passwordHash,
    });
    const token = this.authService.createToken(newUser._id.toString());
    return { id: newUser._id, token };
  }

  @MessagePattern('signin')
  public async signin({
    id,
    password,
  }: SigninDto): Promise<IAuthSigninResponse> {
    if (!Types.ObjectId.isValid(id)) {
      throw new RpcException({
        error_message: 'Id is not valid',
        status: HttpStatus.FORBIDDEN,
      });
    }
    const user = await this.authService.searchUserById(id);
    const passwordHash = this.authService.getEncryptedPassword(password);
    if (!user || user.password !== passwordHash) {
      throw new RpcException({
        error_message: 'Bad id or password',
        status: HttpStatus.UNAUTHORIZED,
      });
    }
    const token = this.authService.createToken(user._id.toString());
    return { token };
  }
}
