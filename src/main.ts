import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {Logger, ValidationPipe} from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: ['log', 'error', 'warn', 'debug', 'verbose'],
    });


    app.enableCors({
        origin: 'http://localhost:3000',
        credentials: true,
    });

    app.useGlobalPipes(new ValidationPipe());
    await app.listen(4000);
    // Log startup info
    const logger = new Logger('Bootstrap');
    logger.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
