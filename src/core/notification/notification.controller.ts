import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';

import { NotificationSubscribeDto } from './dto/notification-subscribe.dto';
import { SubscriptionDto } from './dto/subscription.dto';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @Post('/subscribe')
  async signUp(
    @Body(ValidationPipe) notificationSubscribeDto: NotificationSubscribeDto,
  ): Promise<SubscriptionDto> {
    return this.notificationService.subscribe(notificationSubscribeDto);
  }
}
