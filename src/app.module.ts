import { Module } from '@nestjs/common';
import GraphqlModule from './config/graphql.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [GraphqlModule, CustomerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
