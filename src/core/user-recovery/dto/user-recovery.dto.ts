import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class UserRecoveryDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Transform((value: string) => value?.toLowerCase())
  @Transform((value: string) => value?.trim())
  email: string;
}
