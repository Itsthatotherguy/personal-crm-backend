import {
    BadRequestException,
    ConflictException,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { AbstractRepository, EntityRepository, FindManyOptions } from 'typeorm';
import { Customer } from './customer.entity';
import { v4 as uuid } from 'uuid';
import { GetCustomersFilterDto } from './dto/get-customers-filter.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@EntityRepository(Customer)
export class CustomerRepository extends AbstractRepository<Customer> {
    public async getCustomerById(id: string): Promise<Customer> {
        const found = this.repository.findOne({
            where: { id },
        });

        if (!found) {
            throw new BadRequestException('No customer found');
        }

        return found;
    }

    public async getCustomers(filterDto: GetCustomersFilterDto): Promise<Customer[]> {
        const { search } = filterDto;
        let queryOptions: FindManyOptions<Customer> = {};

        if (search) {
            queryOptions = {
                where: {
                    name: new RegExp(`^${search}`, 'i'),
                },
            };
        }

        try {
            return this.repository.find(queryOptions);
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    public async createCustomer(createCustomerDto: CreateCustomerDto): Promise<Customer> {
        const { name, emailAddress, phoneNumber } = createCustomerDto;

        if (await this.checkIfCustomerExists(name)) {
            throw new ConflictException('A customer with that name already exists');
        }

        const customer = this.repository.create({
            id: uuid(),
            name,
            emailAddress,
            phoneNumber,
        });

        try {
            await this.repository.save(customer);
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException();
        }

        return customer;
    }

    public async updateCustomer(id: string, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
        const existingCustomer = await this.getCustomerById(id);

        const customer = this.repository.create({
            ...existingCustomer,
            ...updateCustomerDto,
        });

        try {
            await this.repository.save(customer);
        } catch (error) {
            throw new InternalServerErrorException();
        }

        return customer;
    }

    public async deleteCustomer(id: string): Promise<string> {
        const result = await this.repository.delete({
            id,
        });

        if (result.affected < 1) {
            throw new NotFoundException('Customer not found');
        }

        return id;
    }

    private async checkIfCustomerExists(name: string): Promise<boolean> {
        return (
            (await this.repository.count({
                where: {
                    name,
                },
            })) > 0
        );
    }
}
