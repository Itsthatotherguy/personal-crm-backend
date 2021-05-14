import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigOptions } from './config/typeorm.module';
import { AppController } from './app.controller';

@Module({
    imports: [TypeOrmModule.forRoot(typeOrmConfigOptions), CustomerModule, AuthModule],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
