import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class UserChangeEmailDto {
  @IsNotEmpty()
  @IsNumber()
  userId: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
