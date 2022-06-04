import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Admin } from './admin.entity';

@Module({
  controllers: [AdminsController],
  imports: [MikroOrmModule.forFeature({ entities: [Admin] })],
  providers: [AdminsService]
})
export class AdminsModule {}
