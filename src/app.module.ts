import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './module/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmConfig } from './db/config/db.config';
import { AuthModule } from './module/auth/auth.module';
import { EventModule } from './module/event/event.module';
import { FavoriteModule } from './module/favorite/favorite.module';
import { MailModule } from './module/mail/mail.module';



@Module({
  imports: [
    
    // Environment Variables Configuration
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),

    // DB Configuration
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        getTypeOrmConfig(configService),
    }),

    // Custom Modules
    AuthModule,
    UserModule,
    EventModule,
    FavoriteModule,
    MailModule,

  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

