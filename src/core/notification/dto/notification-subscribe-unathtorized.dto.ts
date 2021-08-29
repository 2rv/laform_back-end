import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class NotificationSubscribeUnauthtorizedDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
