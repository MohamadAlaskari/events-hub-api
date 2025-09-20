import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EVENTS_CONFIG_KEYS } from "./constants/event.constant";

@Injectable()
export class AppConfigService {
    constructor(private readonly configService: ConfigService) {  }
    

    getDBType(): 'mysql' | 'postgres' {
        const key = this.configService.get<any>('DB_TYPE');
        if (!key) throw new Error('DB_TYPE is not set in .env file');
        return key ;
  }
    getDBHostname(): string {
        const key = this.configService.get<string>('DB_HOST');
        if (!key) throw new Error('DB_HOST is not set in .env file');
        return key;
    }

    getDBPort(): number {
        const key = this.configService.get<number>('DB_PORT');
        if (!key) throw new Error('DB_PORT is not set in .env file');
        return key;
    }

    getDBUsername(): string {
        const key = this.configService.get<string>('DB_USERNAME');
        if (!key) throw new Error('DB_USERNAME is not set in .env file');
        return key;
    }

    getDBPassword(): string {
        const key = this.configService.get<string>('DB_PASSWORD');
        if (!key) throw new Error('DB_PASSWORD is not set in .env file');
        return key;
    }

    getDBName(): string {
        const key = this.configService.get<string>('DB_NAME');
        if (!key) throw new Error('DB_NAME is not set in .env file');
        return key;
    }
    getDBLogging(): boolean {
        return this.configService.get<boolean>('DB_LOGGING', false);
    }
    getJWTSecret(): string {
        const key = this.configService.get<string>('JWT_SECRET');
        if (!key) throw new Error('JWT_SECRET is not set in .env file');
        return key;
    }

    getTicketmasterApiKey(): string {
        const key = this.configService.get<string>(EVENTS_CONFIG_KEYS.API_KEY);
        if (!key) throw new Error('TICKETMASTER_API_KEY is not set in .env file');
        return key;
    }

}