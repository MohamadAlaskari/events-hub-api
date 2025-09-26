import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import {  ConfigService } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { AppConfigService } from '../../common/utils/app-config.service';
import { MailModule } from '../mail/mail.module';
import { MailService } from '../mail/mail.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
       inject: [ConfigService],
      useFactory: ( configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { 
          expiresIn: configService.get<string>('JWT_EXPIRES_IN')  || '30m' ,
        },
      }),
    }),
    UserModule,
    MailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy,MailService ,AppConfigService ],
})
export class AuthModule {}
