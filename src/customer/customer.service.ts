import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { CreateCustomerInput, GetCustomersFilterInput } from './customer.input';
import { CustomerRepository } from './customer.repository';
import { v4 as uuid } from 'uuid';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(CustomerRepository)
        private customerRepository: CustomerRepository,
    ) {}

    public async getCustomerById(id: string): Promise<Customer> {
        return this.customerRepository.getCustomerById(id);
    }

    public async getCustomers(filterInput: GetCustomersFilterInput): Promise<Customer[]> {
        return this.customerRepository.getCustomers(filterInput);
    }

    public async createCustomer(createCustomerInput: CreateCustomerInput): Promise<string> {
        const customer = await this.customerRepository.createCustomer(createCustomerInput);

        return customer.id;
    }
}
