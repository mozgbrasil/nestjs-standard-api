import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NextFunction } from 'express';
import { AppModule } from './app.module';
import { LoggerGuard } from './common/guards/logger.guard';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

export function logger(req: Request, res: Response, next: NextFunction) {
  // console.table([{ logger_req: req, logger_res: res }]);
  console.log(`Logger Main: `);
  next();
}

async function bootstrap() {
  //

  const app = await NestFactory.create(AppModule);

  app.useGlobalGuards(new LoggerGuard());
  app.useGlobalInterceptors(new LoggingInterceptor());

  app.use(logger);
  app.enableCors();

  //

  const config = new DocumentBuilder()
    // .addBasicAuth()
    // .addBearerAuth()
    .setTitle('MJV API')
    .setDescription('The MJV API')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  //

  await app.listen(process.env.PORT || 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);

  //
}
bootstrap();
