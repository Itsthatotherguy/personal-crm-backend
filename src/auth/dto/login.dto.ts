import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    emailAddress: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
