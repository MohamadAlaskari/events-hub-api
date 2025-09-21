import { Controller, Get, Post, Body, Patch, Param, Delete, Query,Request, UseGuards } from '@nestjs/common';
import { EventService } from './event.service';
import { GetEventsDto } from './dto/get-events.dto';
import { ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';


@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}



  @Get("events")
  getEventsByLocation(@Query() query: GetEventsDto) {
    
    return this.eventService.getEvents(
      query.startDate,
      query.countryCode,
      query.size,
      query.page,);
  }

 
  @Get(':id')
  getEventById(@Param('id') id: string) {
    return this.eventService.getEventById(id);
  }


  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post("favorite/:id")
  addFavorite(@Request() req, @Param('id') id: string) {
    return this.eventService.addFavorite(req.ud, id);
  }


  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get("favoritessUser")
  getFavorites(@Request() req) {
    return this.eventService.getFavorites(req.ud);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete("favorite/:id")
  removeFavorite(@Request() req, @Param('id') id: string) {
    return this.eventService.removeFavorite(req.ud, id);
  }
 
}
