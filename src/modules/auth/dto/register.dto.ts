import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';

export class RegisterDto extends CreateUserDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  full_name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsInt()
  @IsNotEmpty()
  @Min(100000000000)
  @Max(999999999999)
  phone: number;
}
