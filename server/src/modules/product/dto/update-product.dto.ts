import {
  IsArray,
  IsInt,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  _id: string;

  @IsString()
  @IsOptional()
  @MinLength(2)
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  price: number;

  @IsInt()
  @IsOptional()
  stock: number;

  @IsMongoId()
  @IsOptional()
  category_id: string;

  @IsArray()
  @IsOptional()
  image_url: string[];
}
