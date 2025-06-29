import { NestFactory } from '@nestjs/core';
import { log } from 'console';
import { AppModule } from './app.module';
import { apiConfig } from './config/api.config';
import { corsConfig } from './config/cors.config';
import { portConfig } from './config/port.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(corsConfig);

  app.setGlobalPrefix(apiConfig.prefix);

  app.enableVersioning(apiConfig.versioning);

  log(`Application is running on: http://localhost:${portConfig}`);

  await app.listen(portConfig);
}
bootstrap();
