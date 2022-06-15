import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';

@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Post()
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providersService.create(createProviderDto);
  }

  @Get()
  findAll() {
    return this.providersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.providersService.findOne(id);
  }

  @Get(':id/events')
  findEvents(@Param('id') id: number) {
    return this.providersService.findEvents(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateProviderDto: UpdateProviderDto) {
    return this.providersService.update(id, updateProviderDto);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: number, @Query('newStatus') newStatus: string) {
    return this.providersService.updateStatus(id, newStatus);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.providersService.remove(id);
  }
}
