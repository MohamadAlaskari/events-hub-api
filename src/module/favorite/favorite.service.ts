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
    try {
      
      const favorite = this.favoriteRepo.create({
        userId,
        eventId,
      });
      return this.favoriteRepo.save(favorite);
    } catch (error) {
      if(error.errno === 1062) {
        throw new Error('Duplicate entry')
      }
    }
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
/*
  async getFavorites(userId: number) {
    const favorites = await this.favoriteRepo.find({
      where: { user: { id: userId } },
    });
    const eventIds = favorites.map((f) => f.eventId);

    if (!eventIds.length) return [];

    // Ticketmaster API call
    const events = await this.eventService.getEventsByIds(eventIds);

    return events.map((event) => {
      const fav = favorites.find((f) => f.eventId === event.id);
      return { ...event, addedAt: fav?.createdAt };
    });
  }
*/
}
