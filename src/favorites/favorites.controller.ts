import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { Roles } from 'src/auth/role.decorator';
import { Role } from 'src/auth/role.enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';


@Roles(Role.Tourist)
@UseGuards(JwtAuthGuard,RolesGuard)
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post(':eventId')
  add(@Request() req, @Param('eventId') eventId: number){
    return this.favoritesService.add(req.user.id, eventId);
  }

  @Delete(':eventId')
  remove(@Request() req, @Param('eventId') eventId: number){
    return this.favoritesService.remove(req.user.id, eventId);
  }

  @Get('')
  findAll(@Request() req){
    return this.favoritesService.findAll(req.user.id);
  }
}
