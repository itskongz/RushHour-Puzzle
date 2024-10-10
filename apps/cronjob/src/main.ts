import { NestFactory } from '@nestjs/core';
import { CronjobModule } from './cronjob.module';

async function bootstrap() {
  const app = await NestFactory.create(CronjobModule);
  await app.listen(3000);
}
bootstrap();
