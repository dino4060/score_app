import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { log } from 'console';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  const port = process.env.PORT ?? 3000;
  log(`Application is running on: http://localhost:${port}`);
  await app.listen(port);
}
bootstrap();
