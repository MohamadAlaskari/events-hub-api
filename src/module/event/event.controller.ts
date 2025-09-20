import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { EventService } from './event.service';
import { GetEventsDto } from './dto/get-events.dto';
import { ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
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

 
}
