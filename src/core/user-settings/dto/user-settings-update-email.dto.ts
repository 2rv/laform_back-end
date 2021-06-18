import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserSettingsUpdateEmailDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
