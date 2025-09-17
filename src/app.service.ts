import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {

  getTest(): string {
    return 'Your app is working!!';
  }

  

  
}
