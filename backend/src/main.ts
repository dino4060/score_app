import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { apiConfig } from './config/api.config';
import { corsConfig } from './config/cors.config';
import { portConfig } from './config/port.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  new Logger('Bootstrap').log(`>>> Bootstrap on port ${portConfig}`);

  app.enableCors(corsConfig);

  app.setGlobalPrefix(apiConfig.prefix);

  app.enableVersioning(apiConfig.versioning);

  await app.listen(portConfig);
}
bootstrap();
