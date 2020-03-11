import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const cors = {
    origin: [
      'http://localhost:4200',
      'http://localhost:8100',
      'http://localhost:8101',
      'http://localhost:8102',
      'http://localhost:5030',
      'http://localhost',
      '*',
    ],
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders: [
      'Accept',
      'Content-Type',
      'Authorization',
    ],
  };
  app.enableCors(cors);
  await app.listen(3000);
}
bootstrap();
