import { Module } from '@nestjs/common';
import GraphqlModule from './config/graphql.module';
import TypeOrmModule from './config/typeorm.module';
import { CustomerModule } from './customer/customer.module';

@Module({
    imports: [GraphqlModule, TypeOrmModule, CustomerModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
