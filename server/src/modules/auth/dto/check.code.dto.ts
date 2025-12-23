import { IsInt, IsNumber, Max, Min } from 'class-validator';

export class CheckCodeDto {
  @IsNumber()
  @IsInt()
  @Min(100000)
  @Max(999999)
  code: number;
}
