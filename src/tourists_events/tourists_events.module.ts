import { Module } from '@nestjs/common';
import { TouristsEventsService } from './tourists_events.service';
import { TouristsEventsController } from './tourists_events.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { TouristsEvent } from './tourists_event.entity';
import { Opinion } from 'src/opinions/opinion.entity';
import { Tourist } from 'src/tourists/tourist.entity';
import { Event } from 'src/events/event.entity';

@Module({
  controllers: [TouristsEventsController],
  imports: [MikroOrmModule.forFeature({ entities: [TouristsEvent, Opinion, Tourist, Event] })],
  providers: [TouristsEventsService]
})
export class TouristsEventsModule {}
