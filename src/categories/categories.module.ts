import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Category } from './category.entity';

@Module({
  controllers: [CategoriesController],
  imports: [MikroOrmModule.forFeature({ entities: [Category] })],
  providers: [CategoriesService]
})
export class CategoriesModule {}
