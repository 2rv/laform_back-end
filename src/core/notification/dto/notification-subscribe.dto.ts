import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class NotificationSubscribeDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
