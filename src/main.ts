import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NextFunction } from 'express';
import { AppModule } from './app.module';

export function logger(req: Request, res: Response, next: NextFunction) {
  // console.table([{ logger_req: req, logger_res: res }]);
  console.log(`Logger Main: `);
  next();
}

async function bootstrap() {
  //

  const app = await NestFactory.create(AppModule);

  app.use(logger);
  app.enableCors();

  //

  const config = new DocumentBuilder()
    // .addBasicAuth()
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
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
