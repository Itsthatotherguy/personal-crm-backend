import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

    public async getCustomerById(id: string): Promise<Customer> {
        return this.customerRepository.getCustomerById(id);
    }

    public async getCustomers(filterDto: GetCustomersFilterDto): Promise<Customer[]> {
        return this.customerRepository.getCustomers(filterDto);
    }

    public async createCustomer(createCustomerDto: CreateCustomerDto): Promise<Customer> {
        return this.customerRepository.createCustomer(createCustomerDto);
    }

    public async updateCustomer(id: string, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
        return this.customerRepository.updateCustomer(id, updateCustomerDto);
    }

    public async deleteCustomer(id: string): Promise<string> {
        return this.customerRepository.deleteCustomer(id);
    }
}
