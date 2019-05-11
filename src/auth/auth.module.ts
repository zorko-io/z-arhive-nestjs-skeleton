import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { HttpStrategy } from './http.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'bearer'}),
    UsersModule
  ],
  providers: [AuthService, HttpStrategy],
  exports: [PassportModule, AuthService]
})

export class AuthModule {}
