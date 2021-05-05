import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class CreateCustomerInput {
    @IsNotEmpty({ message: 'Please provide a name' })
    @Field()
    name: string;

    @IsNotEmpty({ message: 'Please provide a valid email address' })
    @IsEmail({}, { message: 'Please provide a valid email address' })
    @Field()
    emailAddress: string;

    @IsNotEmpty({ message: 'Please provide a valid phone number' })
    @Field()
    phoneNumber: string;
}

@InputType()
export class UpdateCustomerInput extends PartialType(CreateCustomerInput) {}

@InputType()
export class GetCustomersFilterInput {
    @IsOptional()
    @IsNotEmpty()
    search: string;
}
