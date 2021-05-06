import { IsNotEmpty } from 'class-validator';
import { LoginDto } from './login.dto';

export class SignupDto extends LoginDto {
    @IsNotEmpty()
    name: string;
}
