import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AccessTokentype, EmailVerifyPayloadTypes, EmailVerifyTokenType, JWTPayloadTypes } from 'src/common/utils/types/types';
import {  SignupDto } from './dto/signup.dto';
import { MailService } from '../mail/mail.service';

import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
  ) {}

  async signup(signupDto: SignupDto) :Promise<AccessTokentype> {
    const createdUser =await this.userService.create(signupDto);

    const emailVerifyToken:EmailVerifyTokenType  = await this.signEmailVerifyToken({
      sub: createdUser.id,
      type: 'email-verify',
    })
    const baseUrl = 'http://localhost:3000';

    this.mailService.sendVerificationEmail(
      createdUser.email, 
      createdUser.name,
      emailVerifyToken.emailVerifyToken,
      baseUrl
      );


    return this.signToken({
        sub: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
        isEmailVerified: createdUser.isEmailVerified
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

  async verifyEmail(token: string) {
    const secret = this.configService.get<string>('EMAIL_VERIFY_SECRET') ?? this.configService.get<string>('JWT_SECRET') ;
    let payload: EmailVerifyPayloadTypes;
    try {
      payload = await this.jwtService.verifyAsync(token, { secret });
      
    } catch (error) {
      throw new BadRequestException('Invalid or expired token');
    }
    if (payload?.type !== 'email-verify' || !payload?.sub) throw new NotFoundException('Invalid token');

    const user = await this.userService.findOne(payload.sub);

    if (!user) throw new NotFoundException('User not found');

    if (user.isEmailVerified) return {message: 'Email already verified'};

    await this.userService.update(payload.sub, {isEmailVerified: true});

    return {message: 'Email verified successfully'};
  }

  async getProfile(id: string) {
        const user = await this.userService.findOne(id);
        if (!user) {
            throw new NotFoundException('User not found.');
        }
        return user;
    }
    
  private async signToken(payload: JWTPayloadTypes) : Promise<AccessTokentype> {
    return { access_token: await this.jwtService.signAsync(payload)} 
  }

  private async signEmailVerifyToken(payload: EmailVerifyPayloadTypes) : Promise<EmailVerifyTokenType> {
    return {emailVerifyToken: await this.jwtService.signAsync(payload, { 
      secret: this.configService.get<string>('EMAIL_VERIFY_SECRET') ?? this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('EMAIL_VERIFY_EXPIRES_IN') ?? '1h'
    }) }
  }

    
}
