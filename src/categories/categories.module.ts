import { forwardRef, Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Category } from './category.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { EventsModule } from 'src/events/events.module';

@Module({
  controllers: [CategoriesController],
  imports: [MikroOrmModule.forFeature({ entities: [Category] }),
    forwardRef(() => EventsModule),
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '5h' },
    }),
    JwtStrategy
  ],
  providers: [CategoriesService],
  exports: [CategoriesService]
})
export class CategoriesModule {}
