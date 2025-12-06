import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export default class CreateCategoryDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  description: string;
}
