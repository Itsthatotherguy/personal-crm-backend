import {
    BadRequestException,
    ConflictException,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { CreateCustomerInput, GetCustomersFilterInput, UpdateCustomerInput } from './customer.input';
import { v4 as uuid } from 'uuid';

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {
    public async getCustomerById(id: string): Promise<Customer> {
        const found = this.findOne(id);

        if (!found) {
            throw new BadRequestException('No customer found');
        }

        return found;
    }

    public async getCustomers(filterInput: GetCustomersFilterInput): Promise<Customer[]> {
        const { search } = filterInput;
        const query = this.createQueryBuilder('customer');

        if (search) {
            query.andWhere('customer.name LIKE :search', { search: `%${search}%` });
        }

        try {
            return query.getMany();
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    public async createCustomer(createCustomerInput: CreateCustomerInput): Promise<Customer> {
        const { name, emailAddress, phoneNumber } = createCustomerInput;

        if (await this.checkIfCustomerExists(name)) {
            throw new ConflictException('A customer with that name already exists');
        }

        const customer = this.create({
            id: uuid(),
            name,
            emailAddress,
            phoneNumber,
        });

        try {
            await this.save(customer);
        } catch (error) {
            throw new InternalServerErrorException();
        }

        return customer;
    }

    public async updateCustomer(id: string, updateCustomerInput: UpdateCustomerInput): Promise<Customer> {
        const existingCustomer = await this.getCustomerById(id);

        const customer = this.create({
            ...existingCustomer,
            ...updateCustomerInput,
        });

        try {
            await this.save(customer);
        } catch (error) {
            throw new InternalServerErrorException();
        }

        return customer;
    }

    public async deleteCustomer(id: string): Promise<void> {
        const result = await this.delete(id);

        if (result.affected < 1) {
            throw new NotFoundException('Customer not found');
        }
    }

    private async checkIfCustomerExists(name: string): Promise<boolean> {
        return (
            (await this.count({
                where: {
                    name,
                },
            })) > 0
        );
    }
}
