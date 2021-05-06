import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateCustomerDto {
    @IsNotEmpty({ message: 'INVALID_NAME' })
    name: string;

    @IsNotEmpty({ message: 'INVALID_EMAIL' })
    @IsEmail({}, { message: 'INVALID_EMAIL' })
    emailAddress: string;

    @IsNotEmpty({ message: 'INVALID_PHONE_NUMBER' })
    phoneNumber: string;
}
