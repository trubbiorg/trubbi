import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Event } from './event.entity';
import { Provider } from '../providers/provider.entity';
import { ProvidersModule } from 'src/providers/providers.module';

@Module({
  controllers: [EventsController],
  imports: [MikroOrmModule.forFeature({ entities: [Event, Provider] }), ProvidersModule],
  providers: [EventsService]
})
export class EventsModule {}
