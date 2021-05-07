import { IsEmail, IsNotEmpty } from 'class-validator';
import { CustomerErrors } from '../customer.errors';

export class CreateCustomerDto {
    @IsNotEmpty({ message: CustomerErrors.EMPTY_NAME })
    name: string;

    @IsNotEmpty({ message: CustomerErrors.EMPTY_EMAIL })
    @IsEmail({}, { message: CustomerErrors.INVALID_EMAIL })
    emailAddress: string;

    @IsNotEmpty({ message: CustomerErrors.EMPTY_PHONE_NUMBER })
    phoneNumber: string;
}
