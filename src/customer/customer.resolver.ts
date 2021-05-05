import { GetCustomersFilterInput, CreateCustomerInput, UpdateCustomerInput } from './customer.input';
import { CustomerService } from './customer.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CustomerType } from './customer.type';

@Resolver((of) => CustomerType)
export class CustomerResolver {
    constructor(private customerService: CustomerService) {}

    @Query((returns) => [CustomerType])
    public async customers(@Args('filterInput') filterInput?: GetCustomersFilterInput): Promise<CustomerType[]> {
        return this.customerService.getCustomers(filterInput);
    }

    @Query((returns) => CustomerType)
    public async customer(@Args('id') id: string): Promise<CustomerType> {
        return this.customerService.getCustomerById(id);
    }

    @Mutation((returns) => CustomerType)
    public async createCustomer(
        @Args('createCustomerInput') createCustomerInput: CreateCustomerInput,
    ): Promise<CustomerType> {
        return this.customerService.createCustomer(createCustomerInput);
    }

    @Mutation((returns) => CustomerType)
    public async updateCustomer(
        @Args('updateCustomerInput') updateCustomerInput: UpdateCustomerInput,
    ): Promise<CustomerType> {
        return this.customerService.updateCustomer(updateCustomerInput);
    }

    @Mutation((returns) => String)
    public async deleteCustomer(@Args('id') id: string): Promise<string> {
        return this.customerService.deleteCustomer(id);
    }
}
