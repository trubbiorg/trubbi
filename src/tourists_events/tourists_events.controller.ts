import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TouristsEventsService } from './tourists_events.service';
import { CreateTouristsEventDto } from './dto/create-tourists_event.dto';
import { UpdateTouristsEventDto } from './dto/update-tourists_event.dto';

@Controller('tourists-events')
export class TouristsEventsController {
  constructor(private readonly touristsEventsService: TouristsEventsService) {}

  @Post()
  create(@Body() createTouristsEventDto: CreateTouristsEventDto) {
    return this.touristsEventsService.create(createTouristsEventDto);
  }

  @Get()
  findAll() {
    return this.touristsEventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.touristsEventsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTouristsEventDto: UpdateTouristsEventDto) {
    return this.touristsEventsService.update(+id, updateTouristsEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.touristsEventsService.remove(+id);
  }
}
