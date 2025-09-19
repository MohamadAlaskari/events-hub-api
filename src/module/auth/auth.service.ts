import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AccessTokentype, JWTPayloadTypes } from 'src/common/utils/types/types';
import {  SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
          private jwtService: JwtService
  ) {}

  async signup(signupDto: SignupDto) :Promise<AccessTokentype> {
    const createUser =await this.userService.create(signupDto);

    const access_token= await this.generateJWT({
        sub: createUser.id,
        name: createUser.name,
        email: createUser.email,
        isEmailVerified: createUser.isEmailVerified
    })
    return access_token;
  }

 private async generateJWT(payload: JWTPayloadTypes) : Promise<AccessTokentype> {
    return { access_token: await this.jwtService.sign(payload)} 
  }

    
}
