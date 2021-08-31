import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UserGetSubscriptionStatusDto {
  @IsNotEmpty()
  @IsBoolean()
  notificationEmail: boolean;
}
