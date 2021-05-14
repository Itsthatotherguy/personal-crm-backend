import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { Customer } from './customer.entity';
import { CustomerRepository } from './customer.repository';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { GetCustomersFilterDto } from './dto/get-customers-filter.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(CustomerRepository)
        private customerRepository: CustomerRepository,
    ) {}

    public async getCustomerById(id: string, user: User): Promise<Customer> {
        return this.customerRepository.getCustomerById(id, user);
    }

    public async getCustomers(filterDto: GetCustomersFilterDto, user: User): Promise<Customer[]> {
        return this.customerRepository.getCustomers(filterDto, user);
    }

    public async createCustomer(createCustomerDto: CreateCustomerDto, user: User): Promise<Customer> {
        return this.customerRepository.createCustomer(createCustomerDto, user);
    }

    public async updateCustomer(id: string, updateCustomerDto: UpdateCustomerDto, user: User): Promise<Customer> {
        return this.customerRepository.updateCustomer(id, updateCustomerDto, user);
    }

    public async deleteCustomer(id: string, user: User): Promise<string> {
        return this.customerRepository.deleteCustomer(id, user);
    }
}
