import {
  IsEmail,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CheckCodeDto {
  @IsNumber()
  @IsInt()
  @Min(100000)
  @Max(999999)
  code: number;

  @IsString()
  @IsOptional()
  @IsEmail()
  email: string;
}
