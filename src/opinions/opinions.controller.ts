import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OpinionsService } from './opinions.service';
import { CreateOpinionDto } from './dto/create-opinion.dto';
import { UpdateOpinionDto } from './dto/update-opinion.dto';
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
  create(@Body() createOpinionDto: CreateOpinionDto) {
    return this.opinionsService.create(createOpinionDto);
  }

  @Get()
  findAll() {
    return this.opinionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.opinionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOpinionDto: UpdateOpinionDto) {
    return this.opinionsService.update(+id, updateOpinionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.opinionsService.remove(+id);
  }
}
