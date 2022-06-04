import { Module } from '@nestjs/common';
import { TouristsService } from './tourists.service';
import { TouristsController } from './tourists.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Tourist } from './tourist.entity';

@Module({
  controllers: [TouristsController],
  imports: [MikroOrmModule.forFeature({ entities: [Tourist] })],
  providers: [TouristsService]
})
export class TouristsModule {}
