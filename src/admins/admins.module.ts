import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Admin } from './admin.entity';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AdminsController],
  imports: [MikroOrmModule.forFeature({ entities: [Admin] }), JwtStrategy,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '5h' },
    })
  ],
  providers: [AdminsService]
})
export class AdminsModule {}
