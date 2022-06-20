import { Global, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";


@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '5h' },
    })
  ]
})
export class AuthModule {}