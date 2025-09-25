import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Request } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('favorites')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post()
  @ApiOperation({ summary: 'Add a new favorite event' })
  @ApiResponse({ status: 201, description: 'Favorite created', type: CreateFavoriteDto })
  addFavorite(@Request() req, @Body() dto: CreateFavoriteDto) {
    return this.favoriteService.addFavorite(req.user.sub, dto.eventId);
  }

  @Delete(':eventId')
  @ApiOperation({ summary: 'Remove a favorite event' })
  @ApiResponse({ status: 200, description: 'Favorite removed' })
  removeFavorite(@Request() req, @Param('eventId') eventId: string) {
    return this.favoriteService.removeFavorite(req.user.sub, eventId);
  }
/*
  @Get()
  getFavorites(@Request() req) {
    return this.favoriteService.getFavorites(req.user.id);
  }
    */
}
