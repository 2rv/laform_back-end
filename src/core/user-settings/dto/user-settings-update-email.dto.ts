import { IsNotEmpty, IsString } from 'class-validator';
export class UserSettingsUpdateEmailDto {
  @IsNotEmpty()
  @IsString()
  email: string;
}
