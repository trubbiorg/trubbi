import { Module } from '@nestjs/common';
import { TouristsService } from './tourists.service';
import { TouristsController } from './tourists.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Tourist } from './tourist.entity';
import { CategoryRepository } from 'src/categories/category.repository';

@Module({
  controllers: [TouristsController],
  imports: [MikroOrmModule.forFeature({ entities: [Tourist] }), CategoryRepository],
  providers: [TouristsService,CategoryRepository]
})
export class TouristsModule {}
