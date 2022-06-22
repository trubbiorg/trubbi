import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, HttpCode } from '@nestjs/common';
import { TransformInterceptor } from 'src/transform.interceptor';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @HttpCode(200)
  @Post('login')
  login(@Body() req: LoginAdminDto) {
    return this.adminsService.login(req);
  }

  @UseInterceptors(TransformInterceptor)
  @Post('')
  create(@Body() req: CreateAdminDto) {
    return this.adminsService.create(req);
  }
}
