import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UserRecoveryChangeCredentialsDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(100)
  password: string;
}
