import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
  UseInterceptors,
  Request,
} from '@nestjs/common';
import { TouristsService } from './tourists.service';
import { CreateTouristDto } from './dto/create-tourist.dto';
import { UpdateTouristDto } from './dto/update-tourist.dto';
import { Roles } from 'src/auth/role.decorator';
import { Role } from 'src/auth/role.enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LoginTouristDto } from './dto/login-tourist.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { TransformInterceptor } from 'src/transform.interceptor';
import { CategoriesTouristDto } from './dto/categories-tourist.dto';

@Controller('tourists')
export class TouristsController {
  constructor(private readonly touristsService: TouristsService) {}

  @Roles(Role.Tourist)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Post('categories')
  setCategories(@Request() req, @Body() categoriesTouristDto: CategoriesTouristDto) {
    return this.touristsService.setCategories(req.user.id, categoriesTouristDto);
  }

  @Roles(Role.Tourist)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Get('categories')
  findCategories(@Request() req) {
    return this.touristsService.findCategories(req.user.id);
  }

  @Post()
  create(@Body() createTouristDto: CreateTouristDto) {
    return this.touristsService.create(createTouristDto);
  }

  @Post('login')
  login(@Body() req: LoginTouristDto) {
    return this.touristsService.login(req);
  }

  @UseInterceptors(TransformInterceptor)
  @Roles(Role.Tourist)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Get('me')
  findOne(@Request() req) {
    return this.touristsService.findOne(req.user.id, req.user.id);
  }

  @UseInterceptors(TransformInterceptor)
  @Roles(Role.Tourist)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Put()
  update(@Request() req, @Body() updateTouristDto: UpdateTouristDto) {
    return this.touristsService.update(req.user.id, req.user.id, updateTouristDto);
  }

  @UseInterceptors(TransformInterceptor)
  @Roles(Role.Tourist)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Delete(':id')
  remove(@Request() req, @Param('id') id: number) {
    return this.touristsService.remove(req.user.id, id);
  }
}
