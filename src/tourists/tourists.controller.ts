import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TouristsService } from './tourists.service';
import { CreateTouristDto } from './dto/create-tourist.dto';
import { UpdateTouristDto } from './dto/update-tourist.dto';

@Controller('tourists')
export class TouristsController {
  constructor(private readonly touristsService: TouristsService) {}

  @Post()
  create(@Body() createTouristDto: CreateTouristDto) {
    return this.touristsService.create(createTouristDto);
  }

  @Get()
  findAll() {
    return this.touristsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.touristsService.findOne(+id);
  }

  @Post(':id/events/:eventId')
  scheduleEvent(@Param('id') id: number, @Param('eventId') eventId: number) {
    return this.touristsService.scheduleEvent(+id, +eventId);
  }

  @Get(':id/events')
  scheduled(@Param('id') id: number) {
    return this.touristsService.scheduled(id);
  }

  @Get(':id/history')
  history(@Param('id') id: number) {
    return this.touristsService.history(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTouristDto: UpdateTouristDto) {
    return this.touristsService.update(+id, updateTouristDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.touristsService.remove(+id);
  }

  @Post('category/:categoryId')
  addCategory(@Param('categoryId') categoryId: string) {
    return this.touristsService.addCategory(+categoryId);
  }

  @Get('categories/:id')
  findCategories(@Param('id') id: string) {
    return this.touristsService.findCategories(+id);
  }
}
