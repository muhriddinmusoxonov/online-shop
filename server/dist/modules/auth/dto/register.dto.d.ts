import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
export declare class RegisterDto extends CreateUserDto {
    full_name: string;
    email: string;
    password: string;
    phone: number;
}
