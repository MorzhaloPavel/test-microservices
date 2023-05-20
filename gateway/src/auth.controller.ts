import {
  Controller,
  Post,
  Get,
  Body,
  Req,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { SigninDto, SignupDto } from './interfaces/user/dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { IAuthorizedRequest } from './interfaces/common/authorized-request.interface';
import { CustomException } from './exception/custom-exception';
import {
  IAuthSigninResponse,
  IAuthSignupResponse,
  IAuthUserResponse,
} from './interfaces/user/response';

@Controller('/auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authServiceClient: ClientProxy,
  ) {}

  @Post('/signup')
  public async signup(@Body() dto: SignupDto): Promise<IAuthSignupResponse> {
    return await firstValueFrom(this.authServiceClient.send('signup', dto));
  }

  @Post('/signin')
  public async createUser(
    @Body() dto: SigninDto,
  ): Promise<IAuthSigninResponse> {
    try {
      return await firstValueFrom(this.authServiceClient.send('signin', dto));
    } catch (error) {
      throw new CustomException(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user')
  public async loginUser(
    @Req() request: IAuthorizedRequest,
  ): Promise<IAuthUserResponse> {
    const userInfo = request.user;
    return { id: userInfo.userId };
  }
}
