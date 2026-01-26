import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Match } from './match.decorator';

export class ResetCode {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  newPassword: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @Match('newPassword', { message: 'confirmPassword must match newPassword' })
  confirmPassword: string;

  @IsString()
  @IsOptional()
  @IsEmail()
  email: string;
}
