import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerRepository } from './customer.repository';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [TypeOrmModule.forFeature([CustomerRepository]), AuthModule],
    providers: [CustomerService],
    controllers: [CustomerController],
})
export class CustomerModule {}
