import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UserSettingsUpdateSubscribeDto {
  @IsNotEmpty()
  @IsBoolean()
  notificationEmail: boolean;
}
