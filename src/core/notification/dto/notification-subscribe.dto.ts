import { IsBoolean } from 'class-validator';

export class NotificationSubscribeDto {
  @IsBoolean()
  subscribe: boolean;
}
