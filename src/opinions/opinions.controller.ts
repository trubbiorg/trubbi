import { Controller, Get, Post, Body, Param, UseGuards, Query, Request } from '@nestjs/common';
import { OpinionsService } from './opinions.service';
import { CreateOpinionDto } from './dto/create-opinion.dto';
import { Roles } from 'src/auth/role.decorator';
import { Role } from 'src/auth/role.enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('opinions')
export class OpinionsController {
  constructor(private readonly opinionsService: OpinionsService) {}

  @Roles(Role.Tourist)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Post()
  create(@Request() req, @Body() createOpinionDto: CreateOpinionDto) {
    return this.opinionsService.create(req.user.id, createOpinionDto);
  }

  @Roles(Role.Provider)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Get("event/:eventId")
  findAllByEvent(@Param('eventId') eventId: number, @Query('offset') offset = 0) {
    return this.opinionsService.findAllByEvent(eventId, offset);
  }
}
