import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { CreateCustomerInput, GetCustomersFilterInput, UpdateCustomerInput } from './customer.input';
import { CustomerRepository } from './customer.repository';

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

    public async createCustomer(createCustomerInput: CreateCustomerInput): Promise<Customer> {
        return this.customerRepository.createCustomer(createCustomerInput);
    }

    public async updateCustomer(updateCustomerInput: UpdateCustomerInput): Promise<Customer> {
        return this.customerRepository.updateCustomer(updateCustomerInput);
    }

    public async deleteCustomer(id: string): Promise<string> {
        return this.customerRepository.deleteCustomer(id);
    }
}
