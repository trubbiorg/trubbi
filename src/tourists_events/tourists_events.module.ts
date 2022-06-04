import { Module } from '@nestjs/common';
import { TouristsEventsService } from './tourists_events.service';
import { TouristsEventsController } from './tourists_events.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { TouristsEvent } from './tourists_event.entity';

@Module({
  controllers: [TouristsEventsController],
  imports: [MikroOrmModule.forFeature({ entities: [TouristsEvent] })],
  providers: [TouristsEventsService]
})
export class TouristsEventsModule {}
