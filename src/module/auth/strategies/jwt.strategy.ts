
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AppConfigService } from '../../../common/utils/app-config.service';
import { JWTPayloadTypes } from '../../../common/utils/types/types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly appConfigService:AppConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConfigService.getJWTSecret(),
    });
  }

  async validate(payload: JWTPayloadTypes) {
    return payload;
  }
}
