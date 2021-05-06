import { Module } from '@nestjs/common';
import TypeOrmModule from './config/typeorm.module';
import { CustomerModule } from './customer/customer.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [TypeOrmModule, CustomerModule, AuthModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
