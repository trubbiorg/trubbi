import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, UseInterceptors, HttpException, Put, Query } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/role.decorator';
import { Role } from 'src/auth/role.enum';
import { RolesGuard } from 'src/auth/roles.guard';
import { TransformInterceptor } from 'src/transform.interceptor';
import { Event } from './event.entity';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @UseInterceptors(TransformInterceptor)
  @Roles(Role.Provider)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Request() req, @Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(req.user.id, createEventDto);
  }

  @UseInterceptors(TransformInterceptor)
  @Roles(Role.Admin, Role.Provider)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Get('provider')
  findAllByProvider(@Request() req, @Query('providerId') providerId: number, @Query('offset') offset = 0) {
    return this.eventsService.findAllByProvider((providerId) ?? req.user.id, offset);
  }

  @Roles(Role.Tourist)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll(@Request() req) {
    return this.eventsService.findAll(req.user.id);
  }

  @Roles(Role.Tourist)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('byName')
  findAllByName(@Query('name') name: string) {
    return this.eventsService.findAllByName(name);
  }

  @Roles(Role.Tourist, Role.Provider)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Get(':id')
  async findOne(@Request() req, @Param('id') id: number) {
    const event: Event = await this.eventsService.findOne(id);
    if(req.user.role == Role.Provider && req.user.id != event.provider.id){
      throw new HttpException('No tiene permisos para ver este evento', 403);
    }
    return event;
  }

  @Get(':id/opinions')
  @Roles(Role.Provider)
  @UseGuards(JwtAuthGuard,RolesGuard)
  findOpinions(@Request() req, @Param('id') id: number) {
    return this.eventsService.findOpinions(req.user.id, id);
  }

  @Get(':id/tourists')
  @Roles(Role.Provider)
  @UseGuards(JwtAuthGuard,RolesGuard)
  findTourists(@Request() req, @Param('id') id: number) {
    return this.eventsService.findTourists(req.user.id, id);
  }

  @Put(':id')
  @Roles(Role.Provider)
  @UseGuards(JwtAuthGuard,RolesGuard)
  update(@Request() req, @Param('id') id: number, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(req.user.id, id, updateEventDto);
  }

  @Delete(':id')
  @Roles(Role.Provider)
  @UseGuards(JwtAuthGuard,RolesGuard)
  remove(@Request() req, @Param('id') id: number) {
    return this.eventsService.remove(req.user.id, id);
  }
}
