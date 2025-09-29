import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const getTypeOrmConfig = (

    
    configService: ConfigService,
): TypeOrmModuleOptions => ({
    type: configService.get<any>('DB_TYPE', 'mysql') ,
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT', 3306),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_NAME'),
    autoLoadEntities: true,
    synchronize: true, // In Produktion sollte dies auf `false` gesetzt werden!
   logging: configService.get<boolean>('DB_LOGGING', true),
});

