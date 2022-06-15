import { forwardRef, Module } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { ProvidersController } from './providers.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Provider } from './provider.entity';
import { EventsModule } from 'src/events/events.module';
import { Event } from 'src/events/event.entity';

@Module({
  controllers: [ProvidersController],
  imports: [MikroOrmModule.forFeature({ entities: [Provider, Event] }), forwardRef(() => EventsModule)],
  providers: [ProvidersService],
  exports: [ProvidersService]
})
export class ProvidersModule {}
