import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { AppConfigService } from 'src/common/utils/app-config.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [EventController],
  providers: [EventService, AppConfigService],
})
export class EventModule {}
