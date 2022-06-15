import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { TouristsModule } from './tourists/tourists.module';
import { AdminsModule } from './admins/admins.module';
import { ProvidersModule } from './providers/providers.module';
import { OpinionsModule } from './opinions/opinions.module';
import { EventsModule } from './events/events.module';
import { CategoriesModule } from './categories/categories.module';
import { TouristsEventsModule } from './tourists_events/tourists_events.module';
import { LoggingInterceptor } from './LoggingInterceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    TouristsModule,
    AdminsModule,
    ProvidersModule,
    OpinionsModule,
    EventsModule,
    CategoriesModule,
    TouristsEventsModule,
  ],
  controllers: [],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
  ],
})
export class AppModule {}
