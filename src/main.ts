import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

process.env.TZ = "Asia/Kolkata";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'
  });

  const configService = app.get(ConfigService);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1'
  });

  const port = configService.get<number>('PORT');
  await app.listen(port ?? '4000');
  console.log(`Application listening in port: ${port}`);
}
bootstrap();
