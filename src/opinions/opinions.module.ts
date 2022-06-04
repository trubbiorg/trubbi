import { Module } from '@nestjs/common';
import { OpinionsService } from './opinions.service';
import { OpinionsController } from './opinions.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Opinion } from './opinion.entity';

@Module({
  controllers: [OpinionsController],
  imports: [MikroOrmModule.forFeature({ entities: [Opinion] })],
  providers: [OpinionsService]
})
export class OpinionsModule {}
