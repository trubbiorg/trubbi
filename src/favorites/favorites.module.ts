import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TouristsModule } from 'src/tourists/tourists.module';
import { EventsModule } from 'src/events/events.module';
import { TouristsEventRepository } from 'src/tourists/tourists_event.repository';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Tourist } from 'src/tourists/tourist.entity';
import { TouristsEvent } from 'src/tourists/tourists_event.entity';
import { Event } from 'src/events/event.entity';

@Module({
  controllers: [FavoritesController],
  imports: [MikroOrmModule.forFeature({entities: [TouristsEvent, Tourist, Event]}),
    TouristsModule,
    EventsModule,
    JwtStrategy,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '5h' },
    }),
    TouristsEventRepository
  ],
  providers: [FavoritesService]
})
export class FavoritesModule {}
