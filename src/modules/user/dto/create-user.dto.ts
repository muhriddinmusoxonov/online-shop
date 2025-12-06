import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';

enum UserRole {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}

export class CreateUserDto {
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

  @IsOptional()
  @IsEnum(UserRole, { message: 'Role must be one of: admin, customer' })
  role: string;
}
