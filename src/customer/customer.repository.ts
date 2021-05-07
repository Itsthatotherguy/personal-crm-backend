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
import { CustomerErrors } from './customer.errors';
import { User } from 'src/auth/user.entity';

@EntityRepository(Customer)
export class CustomerRepository extends AbstractRepository<Customer> {
    public async getCustomerById(id: string, user: User): Promise<Customer> {
        const found = this.repository.findOne({
            where: { id, userId: user.id },
        });

        if (!found) {
            throw new NotFoundException(CustomerErrors.CUSTOMER_NOT_FOUND);
        }

        return found;
    }

    public async getCustomers(filterDto: GetCustomersFilterDto, user: User): Promise<Customer[]> {
        const { search } = filterDto;
        const query = this.repository.createQueryBuilder('customer');

        query.where('customer.userId = :userId', { userId: user.id });

        if (search) {
            query.andWhere('customer.name LIKE :search', { search: '%search%' });
        }

        try {
            return query.getMany();
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    public async createCustomer(createCustomerDto: CreateCustomerDto, user: User): Promise<Customer> {
        const { name, emailAddress, phoneNumber } = createCustomerDto;

        if (await this.checkIfCustomerExists(name)) {
            throw new ConflictException(CustomerErrors.DUPLICATE_NAME);
        }

        const customer = this.repository.create({
            id: uuid(),
            name,
            emailAddress,
            phoneNumber,
            user,
        });

        try {
            await this.repository.save(customer);
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException();
        }

        return customer;
    }

    public async updateCustomer(id: string, updateCustomerDto: UpdateCustomerDto, user: User): Promise<Customer> {
        const existingCustomer = await this.getCustomerById(id, user);

        if (this.checkIfCustomerNameExistsIfDifferent(existingCustomer, updateCustomerDto)) {
            throw new ConflictException(CustomerErrors.DUPLICATE_NAME);
        }

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

    public async deleteCustomer(id: string, user: User): Promise<string> {
        const result = await this.repository.delete({
            id,
            userId: user.id,
        });

        if (result.affected < 1) {
            throw new NotFoundException(CustomerErrors.CUSTOMER_NOT_FOUND);
        }

        return id;
    }

    private async checkIfCustomerNameExistsIfDifferent(
        existingCustomer: Customer,
        updateCustomerDto: UpdateCustomerDto,
    ): Promise<boolean> {
        if (!updateCustomerDto.name || existingCustomer.name === updateCustomerDto.name) {
            return false;
        }

        return this.checkIfCustomerExists(updateCustomerDto.name);
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
