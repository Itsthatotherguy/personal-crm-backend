import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Customer } from './customer.entity';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { GetCustomersFilterDto } from './dto/get-customers-filter.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customer')
@UseGuards(AuthGuard())
export class CustomerController {
    constructor(private customerService: CustomerService) {}

    @Get()
    async getCustomers(@Query(ValidationPipe) filterDto: GetCustomersFilterDto): Promise<Customer[]> {
        return this.customerService.getCustomers(filterDto);
    }

    @Get('/:id')
    async getCustomerById(@Param('id') id: string): Promise<Customer> {
        return this.customerService.getCustomerById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    async createCustomer(@Body() createCustomerDto: CreateCustomerDto): Promise<Customer> {
        return this.customerService.createCustomer(createCustomerDto);
    }

    @Put('/:id')
    @UsePipes(ValidationPipe)
    async updateCustomer(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
        return this.customerService.updateCustomer(id, updateCustomerDto);
    }

    @Delete('/:id')
    @HttpCode(204)
    async deleteCustomer(@Param('id') id: string): Promise<void> {
        this.customerService.deleteCustomer(id);
    }
}
