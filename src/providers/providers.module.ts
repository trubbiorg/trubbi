import { forwardRef, Module } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { ProvidersController } from './providers.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Provider } from './provider.entity';
import { EventsModule } from 'src/events/events.module';
import { Event } from 'src/events/event.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  controllers: [ProvidersController],
  imports: [
    MikroOrmModule.forFeature({ entities: [Provider, Event] }),
    forwardRef(() => EventsModule),
    PassportModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '5h' },
    }),
    JwtStrategy
  ],
  providers: [ProvidersService],
  exports: [ProvidersService]
})
export class ProvidersModule {}
