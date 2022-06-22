import { Controller, Get, Post, Body, Param, Delete, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/role.decorator';
import { Role } from 'src/auth/role.enum';
import { RolesGuard } from 'src/auth/roles.guard';
import { TransformInterceptor } from 'src/transform.interceptor';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}


  @UseInterceptors(TransformInterceptor)
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @UseInterceptors(TransformInterceptor)
  @Roles(Role.Admin, Role.Provider, Role.Tourist)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Roles(Role.Tourist)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id/events')
  findEvents(@Param('id') id: number) {
    return this.categoriesService.findEvents(id);
  }

  @UseInterceptors(TransformInterceptor)
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.categoriesService.remove(id);
  }
}
