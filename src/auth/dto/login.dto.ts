import { IsNotEmpty, IsString } from 'class-validator';
import { AuthErrors } from '../auth.errors';

export class LoginDto {
    @IsNotEmpty({ message: AuthErrors.EMPTY_EMAIL })
    emailAddress: string;

    @IsNotEmpty({ message: AuthErrors.EMPTY_PASSWORD })
    password: string;
}
