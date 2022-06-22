import { Controller, Get, Post, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { Roles } from 'src/auth/role.decorator';
import { Role } from 'src/auth/role.enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@Roles(Role.Tourist)
@UseGuards(JwtAuthGuard,RolesGuard)
@Controller('schedule')
export class ScheduleController {
  constructor(
    private readonly scheduleService: ScheduleService,
    ) {}

  @Post(':eventId')
  add(@Request() req, @Param('eventId') eventId: number){
    return this.scheduleService.add(req.user.id, eventId);
  }

  @Delete(':eventId')
  remove(@Request() req, @Param('eventId') eventId: number){
    return this.scheduleService.remove(req.user.id, eventId);
  }

  @Get('')
  findAll(@Request() req){
    return this.scheduleService.findAll(req.user.id);
  }

  @Get('history')
  getHistory(@Request() req){
    return this.scheduleService.getHistory(req.user.id);
  }
}
