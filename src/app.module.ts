import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { AuthenticationService } from './authentication/authentication.service';
import { UsersService } from './users/users.service';

@Module({
  imports: [],
  controllers: [AppController, UsersController],
  providers: [AppService, AuthenticationService, UsersService],
})
export class AppModule {}
