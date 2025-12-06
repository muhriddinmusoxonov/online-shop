import { IsNotEmpty, IsString } from 'class-validator';

export class SendCodeDto {
  @IsString()
  @IsNotEmpty()
  email: string;
}
