import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';

const serverConfig = config.get('server');

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    if (process.env.NODE_ENV === 'development') {
        app.enableCors();
    } else {
        app.enableCors({
            origin: serverConfig.origin,
        });
    }

    const port = const port = process.env.PORT || serverConfig.port;

    await app.listen(port);
}
bootstrap();
