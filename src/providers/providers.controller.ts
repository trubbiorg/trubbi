import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, UseGuards, UseInterceptors, Req, Request } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { LoginProviderDto } from './dto/login-provider.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from 'src/auth/role.decorator';
import { Role } from 'src/auth/role.enum';
import { RolesGuard } from 'src/auth/roles.guard';
import { TransformInterceptor } from 'src/transform.interceptor';

@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @UseInterceptors(TransformInterceptor)
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providersService.create(createProviderDto);
  }

  @UseInterceptors(TransformInterceptor)
  @Roles(Role.Provider)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Get('me')
  findMe(@Request() req) {
    return this.providersService.findOne(req.user.id, req.user.id);
  }

  @Post('login')
  async login(@Body() req: LoginProviderDto) {
    return this.providersService.login(req);
  }

  @UseInterceptors(TransformInterceptor)
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Get()
  findAll() {
    return this.providersService.findAll();
  }

  @UseInterceptors(TransformInterceptor)
  @Roles(Role.Provider)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Get(':id')
  findOne(@Request() req, @Param('id') id: number) {
    return this.providersService.findOne(req.user.id, id);
  }

  @UseInterceptors(TransformInterceptor)
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Put(':id')
  update(@Request() req, @Param('id') id: number, @Body() updateProviderDto: UpdateProviderDto) {
    return this.providersService.update(req.user.id, id, updateProviderDto);
  }

  @UseInterceptors(TransformInterceptor)
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Patch(':id/status')
  updateStatus(@Param('id') id: number, @Query('newStatus') newStatus: string) {
    return this.providersService.updateStatus(id, newStatus);
  }
}
