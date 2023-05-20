import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ConfigService } from '../config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      passReqToCallback: true,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: new ConfigService().get('jwtSecret'),
    });
  }

  async validate(
    _: Request,
    { userId }: { userId: string },
  ): Promise<{ userId: string }> {
    if (!userId) {
      throw new HttpException(
        { error_message: 'Bad token' },
        HttpStatus.FORBIDDEN,
      );
    }
    return { userId };
  }
}
