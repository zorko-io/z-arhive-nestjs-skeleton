import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
       secretOrPrivateKey: 'secretKey',
       signOptions: {
         expiresIn: 3600
       }
    })],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule, AuthService]
})

export class AuthModule {}
