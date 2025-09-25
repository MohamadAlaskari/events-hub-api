import { Injectable, NotFoundException } from '@nestjs/common';
import { Favorite } from './entities/favorite.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventService } from '../event/event.service';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepo: Repository<Favorite>,
    private readonly eventService: EventService,
  ) {}

  async addFavorite(userId: string, eventId: string) {
      const favorite = this.favoriteRepo.create({
        userId,
        eventId,
      });
      return this.favoriteRepo.save(favorite);
    
  }

  async removeFavorite(userId: string, eventId: string) {
    const result = await this.favoriteRepo.delete({
      userId,
      eventId,
    });
    //result.affected === 0 means that no rows were affected by the delete operation and ===1 means that one row was affected
    if (result.affected === 0) {
      throw new NotFoundException('Favorite not found');
    }
    return { message: 'Favorite removed successfully' };
  }

  async isEventFavoriteByUser(userId: string, eventId: string) {
    const favorite = await this.favoriteRepo.findOne({
      where: { userId, eventId },
    });
    if (!favorite) throw new NotFoundException('Favorite not found');
    return true;
  }

  async getFavorites(userId: string) {
    const favorites = await this.favoriteRepo.find({
      where: { user: { id: userId } },
    });
    const eventIds = favorites.map((f) => f.eventId);

    if (!eventIds.length) throw new NotFoundException('No favorites found');

    // Ticketmaster API call
    const events = await this.eventService.getEventsByIds(eventIds);
    return events
  }
}
