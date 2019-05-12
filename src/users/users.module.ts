import { INestApplication, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

@Module({
  imports: [
    PassportModule,
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}])
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {

  static addSwaggerDocument(path: string, app: INestApplication) {
    const options = new DocumentBuilder()
      .setTitle('Users example')
      .setDescription('The users API description')
      .setVersion('1.0')
      .addTag('users')
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(path, app, document);
  }
}
