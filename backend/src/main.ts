import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';
import { SwaggerModule, DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

async function bootstrap() {
  const PORT = 4000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.set('trust proxy', true);
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  console.log(`Listening on PORT:${PORT}`);
  app.useGlobalInterceptors(new TransformInterceptor());
  
  const swaggerConfig = new DocumentBuilder()
      .setTitle('Password wallet')
      .setDescription('Application for password management')
      .setVersion('1.0')
      .addBearerAuth(
        { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
        'access-token',
      )
      .build();

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
      deepScanRoutes: true
    },
  };
  const document = SwaggerModule.createDocument(app, swaggerConfig );
  SwaggerModule.setup('api', app, document, customOptions);

  await app.listen(PORT);
}
bootstrap();
