import { Module } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { ProvidersController } from './providers.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Provider } from './provider.entity';

@Module({
  controllers: [ProvidersController],
  imports: [MikroOrmModule.forFeature({ entities: [Provider] })],
  providers: [ProvidersService],
  exports: [ProvidersService]
})
export class ProvidersModule {}
