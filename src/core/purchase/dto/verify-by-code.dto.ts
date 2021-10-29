import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class VerifyByCodeDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  emailConfirmCode: string;
}
