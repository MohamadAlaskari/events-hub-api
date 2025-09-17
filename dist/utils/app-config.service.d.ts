import { ConfigService } from "@nestjs/config";
export declare class AppConfigService {
    private readonly configService;
    constructor(configService: ConfigService);
    getDBType(): 'mysql' | 'postgres';
    getDBHostname(): string;
    getDBPort(): number;
    getDBUsername(): string;
    getDBPassword(): string;
    getDBName(): string;
    getDBLogging(): boolean;
}
