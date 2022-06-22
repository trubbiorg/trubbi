import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotificationService } from './notifications.service';

@Controller("notifications")
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationService) {}

   @Get('topic')
   topic() {
     return this.notificationsService.topic();
   }
}