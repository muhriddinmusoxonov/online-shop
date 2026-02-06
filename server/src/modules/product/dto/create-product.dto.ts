import {
  IsArray,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @IsString()
  @IsOptional()
  slug: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  price: number;

  @IsInt()
  @IsNotEmpty()
  stock: number;

  @IsMongoId()
  @IsNotEmpty()
  category_id: string;

  @IsMongoId()
  @IsNotEmpty()
  user_id: string;

  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true }) // har bir element string bo‘lsin
  @IsUrl({}, { each: true }) // har biri haqiqiy URL bo‘lsin
  image_url: string[];
}
