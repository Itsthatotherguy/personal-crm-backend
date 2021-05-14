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
import { GetUser } from '../auth/get-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../auth/user.entity';
import { Customer } from './customer.entity';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { GetCustomersFilterDto } from './dto/get-customers-filter.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customers')
@UseGuards(JwtAuthGuard)
export class CustomerController {
    constructor(private customerService: CustomerService) {}

    @Get()
    async getCustomers(
        @Query(ValidationPipe) filterDto: GetCustomersFilterDto,
        @GetUser() user: User,
    ): Promise<Customer[]> {
        return this.customerService.getCustomers(filterDto, user);
    }

    @Get('/:id')
    async getCustomerById(@Param('id') id: string, @GetUser() user: User): Promise<Customer> {
        return this.customerService.getCustomerById(id, user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    async createCustomer(@Body() createCustomerDto: CreateCustomerDto, @GetUser() user: User): Promise<Customer> {
        return this.customerService.createCustomer(createCustomerDto, user);
    }

    @Put('/:id')
    @UsePipes(ValidationPipe)
    async updateCustomer(
        @Param('id') id: string,
        @Body() updateCustomerDto: UpdateCustomerDto,
        @GetUser() user: User,
    ): Promise<Customer> {
        return this.customerService.updateCustomer(id, updateCustomerDto, user);
    }

    @Delete('/:id')
    @HttpCode(204)
    async deleteCustomer(@Param('id') id: string, @GetUser() user: User): Promise<void> {
        this.customerService.deleteCustomer(id, user);
    }
}
