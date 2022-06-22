import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationService } from './notifications.service';

@Module({
  controllers: [NotificationsController],
  providers: [NotificationService]
})
export class NotificationsModule {}