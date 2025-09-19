import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './module/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmConfig } from './db/config/db.config';
import { AuthModule } from './module/auth/auth.module';



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

  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

