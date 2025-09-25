import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { EventService } from '../event/event.service';
import { EventModule } from '../event/event.module';
import { AppConfigService } from 'src/common/utils/app-config.service';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite]), EventModule],
  controllers: [FavoriteController],
  providers: [FavoriteService,EventService,AppConfigService],
})
export class FavoriteModule {}
