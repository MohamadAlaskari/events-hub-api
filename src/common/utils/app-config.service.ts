import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AppConfigService {
    constructor(private readonly configService: ConfigService) {  }
    

    getDBType(): 'mysql' | 'postgres' {
        const key = this.configService.get<any>('DB_TYPE');
        if (!key) throw new Error('DB_TYPE is not set in .env file');
        return key ;
  }
   
}