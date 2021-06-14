import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserRecoveryDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}

export class UserRecoveryChangePasswordDto {
  password: string;
}

export class PasswordRecoveryEmailDto {
  email: string;
  userId: number;
}
