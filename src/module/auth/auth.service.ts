import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AccessTokentype, JWTPayloadTypes } from 'src/common/utils/types/types';
import {  SignupDto } from './dto/signup.dto';
import { MailService } from '../mail/mail.service';

import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
    private readonly mailService: MailService,
  ) {}

  async signup(signupDto: SignupDto) :Promise<AccessTokentype> {
    const createUser =await this.userService.create(signupDto);

    return this.signToken({
        sub: createUser.id,
        name: createUser.name,
        email: createUser.email,
        isEmailVerified: createUser.isEmailVerified
    })
   
  }
  
  async login(user: any): Promise<AccessTokentype> {
    this.mailService.sendWelcomeEmail(user.email, user.name);
    return this.signToken({
      sub: user.id,
      name: user.name,
      email: user.email,
      isEmailVerified: user.isEmailVerified,
    });
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) return null;
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return null;
    const { password: _p, ...safe } = user;
    return safe;
  }

  async getProfile(id: string) {
        const user = await this.userService.findOne(id);
        if (!user) {
            throw new NotFoundException('User not found.');
        }
        return user;
    }
    
 private async signToken(payload: JWTPayloadTypes) : Promise<AccessTokentype> {
    return { access_token: await this.jwtService.sign(payload)} 
  }

    
}
