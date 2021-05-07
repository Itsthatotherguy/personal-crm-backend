import { IsNotEmpty, IsOptional } from 'class-validator';
import { CustomerErrors } from '../customer.errors';

export class GetCustomersFilterDto {
    @IsOptional()
    @IsNotEmpty({ message: CustomerErrors.INVALID_SEARCH })
    search: string;
}
