import { forwardRef, Module } from '@nestjs/common';
import { TouristsService } from './tourists.service';
import { TouristsController } from './tourists.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Tourist } from './tourist.entity';
import { CategoriesModule } from 'src/categories/categories.module';
import { EventsModule } from 'src/events/events.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { TouristsEvent } from './tourists_event.entity';
import { TouristsRepository } from './tourists.repository';

@Module({
  controllers: [TouristsController],
  imports: [
    MikroOrmModule.forFeature({ entities: [Tourist, TouristsEvent] }),
    JwtStrategy,
    forwardRef(() => EventsModule),
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '5h' },
    }),
    CategoriesModule
  ],
  exports: [TouristsService],
  providers: [TouristsService]
})
export class TouristsModule {}
