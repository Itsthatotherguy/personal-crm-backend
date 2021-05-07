import { IsNotEmpty } from 'class-validator';
import { AuthErrors } from '../auth.errors';
import { LoginDto } from './login.dto';

export class SignupDto extends LoginDto {
    @IsNotEmpty({ message: AuthErrors.EMPTY_NAME })
    name: string;
}
