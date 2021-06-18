import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateAccountEmailDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
