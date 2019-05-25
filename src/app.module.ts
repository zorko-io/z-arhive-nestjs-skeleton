import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles/roles.guard';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/zorko'),
    AuthModule,
    UsersModule
  ],
  controllers: [
    UsersController
  ],
  providers: [
    AppService, {
    provide: APP_GUARD,
    useClass: RolesGuard
  }],
})
export class AppModule {}
