import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AccessTokentype, JWTPayloadTypes } from 'src/common/utils/types/types';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
          private jwtService: JwtService
  ) {}



 private async generateJWT(payload: JWTPayloadTypes) : Promise<AccessTokentype> {
    return { access_token: await this.jwtService.sign(payload)} 
  }

    
}
