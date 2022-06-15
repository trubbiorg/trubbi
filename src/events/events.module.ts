import { forwardRef, Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Event } from './event.entity';
import { Provider } from '../providers/provider.entity';
import { ProvidersModule } from 'src/providers/providers.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { TouristsEvent } from 'src/tourists_events/tourists_event.entity';
import { TouristsEventsModule } from 'src/tourists_events/tourists_events.module';
import { OpinionsModule } from 'src/opinions/opinions.module';

@Module({
  controllers: [EventsController],
  imports: [MikroOrmModule.forFeature({ entities: [Event, TouristsEvent] }), forwardRef(() => ProvidersModule), CategoriesModule, TouristsEventsModule, OpinionsModule],
  providers: [EventsService],
  exports: [EventsService]
})
export class EventsModule {}
