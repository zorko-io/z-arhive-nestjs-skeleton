import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/zorko'),
    AuthModule,
    UsersModule
  ],
  controllers: [
    UsersController
  ],
  providers: [AppService],
})
export class AppModule {}
