import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Match } from './match.decorator';

export class ResetCode {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  code: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @Match('code', { message: 'confirmPassword must match code' })
  confirmPassword: string;
}
