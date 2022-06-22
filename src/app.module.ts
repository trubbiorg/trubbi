import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { TouristsModule } from './tourists/tourists.module';
import { AdminsModule } from './admins/admins.module';
import { ProvidersModule } from './providers/providers.module';
import { OpinionsModule } from './opinions/opinions.module';
import { EventsModule } from './events/events.module';
import { CategoriesModule } from './categories/categories.module';
import { LoggingInterceptor } from './LoggingInterceptor';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ScheduleModule } from './schedule/schedule.module';
import { FavoritesModule } from './favorites/favorites.module';
import { HttpExceptionFilter } from './http-exception.filter';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    TouristsModule,
    AdminsModule,
    ProvidersModule,
    OpinionsModule,
    EventsModule,
    CategoriesModule,
    ScheduleModule,
    FavoritesModule,
  ],
  controllers: [],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
  ],
})
export class AppModule {}
