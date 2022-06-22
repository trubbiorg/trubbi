import { forwardRef, Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Event } from './event.entity';
import { ProvidersModule } from 'src/providers/providers.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { OpinionsModule } from 'src/opinions/opinions.module';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { TouristsEvent } from 'src/tourists/tourists_event.entity';
import { TouristsModule } from 'src/tourists/tourists.module';

@Module({
  controllers: [EventsController],
  imports: [MikroOrmModule.forFeature({ entities: [Event, TouristsEvent] }),
    JwtStrategy,
    forwardRef(() => TouristsModule),
    forwardRef(() => ProvidersModule),
    forwardRef(() => CategoriesModule),
    forwardRef(() => OpinionsModule),
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '5h' },
    })
  ],
  providers: [EventsService],
  exports: [EventsService]
})
export class EventsModule {}
