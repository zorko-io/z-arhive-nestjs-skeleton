import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from './config/config.service';

export async function bootstrap(port?: number | string) {
  const app = await NestFactory.create(AppModule);  // TODO: switch to dynamic modules and pass config service there
  const config = new ConfigService();

  const options = new DocumentBuilder()
    .setTitle('Zorko REST API')
    .setDescription('The zorko REST API description')
    .setVersion('1.0')
    .addTag('users')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port ? config.get('PORT') : 3000);
  return {
    async close() {
      return  await app.close();
    }
  }
}
