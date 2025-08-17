import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AllExceptionFilter } from './infra/exception-filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: process.env.RABBITMQ_URLS?.split(','),
        queue: 'admin',
      },
    },
  );

  app.useGlobalFilters(app.get(AllExceptionFilter));

  await app.listen();
}
bootstrap();
