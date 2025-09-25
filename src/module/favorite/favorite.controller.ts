import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Request } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { ApiErrorResponses } from 'src/common/decorators/api-error-responses.decorator';

@Controller('favorite')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post(':eventId')
  @ApiOperation({ summary: 'Add a new favorite event' })
  @ApiResponse({ status: 201, description: 'Favorite created', type: CreateFavoriteDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 409, description: 'Duplicate entry' })
  @ApiErrorResponses()
  addFavorite(@Request() req, @Param('eventId') eventId: string) {
    return this.favoriteService.addFavorite(req.user.sub, eventId);
  }

  @Delete(':eventId')
  @ApiOperation({ summary: 'Remove a favorite event' })
  @ApiResponse({ status: 200, description: 'Favorite removed successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Favorite not found' })
  @ApiParam( { name: 'eventId', description: 'ID of the event to remove from favorites' })
  removeFavorite(@Request() req, @Param('eventId') eventId: string) {
    return this.favoriteService.removeFavorite(req.user.sub, eventId);
  }

  
  @Get(':eventId')
  @ApiOperation({ summary: 'Check if an event is a favorite for the current user' })
  @ApiResponse({ status: 200, description: 'Favorite status', type: Boolean })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  isFavorite(@Request() req, @Param('eventId') eventId: string) {
    return this.favoriteService.isEventFavoriteByUser(req.user.sub, eventId);
  }


  @Get()
  @ApiOperation({ summary: 'Get all favorites for the current user' })
  @ApiResponse({ status: 200, description: 'List of favorites' })
  @ApiResponse({ status: 404, description: 'No favorites found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiOperation({ summary: 'Get all favorites for the current user' })
  @ApiResponse({ status: 200, description: 'List of favorites' })
  getFavorites(@Request() req) {
    return this.favoriteService.getFavorites(req.user.sub);
  }
    
}
