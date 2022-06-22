import { forwardRef, Module } from '@nestjs/common';
import { OpinionsService } from './opinions.service';
import { OpinionsController } from './opinions.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Opinion } from './opinion.entity';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { EventsModule } from 'src/events/events.module';

@Module({
  controllers: [OpinionsController],
  imports: [
    MikroOrmModule.forFeature({ entities: [Opinion] }),
    JwtStrategy,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '5h' },
    }),
    forwardRef(() => EventsModule)
  ],
  providers: [OpinionsService]
})
export class OpinionsModule {}
