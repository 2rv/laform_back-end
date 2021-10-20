import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class AuthBasketForCodeDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  code: string;
}
