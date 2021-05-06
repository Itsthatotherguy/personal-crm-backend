import { IsNotEmpty, IsOptional } from 'class-validator';

export class GetCustomersFilterDto {
    @IsOptional()
    @IsNotEmpty({ message: 'INVALID_SEARCH' })
    search: string;
}
