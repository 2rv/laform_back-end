import {
  Controller,
  Post,
  Get,
  Body,
  ValidationPipe,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { NotificationSubscribeUnauthtorizedDto } from './dto/notification-subscribe-unathtorized.dto';
import { NotificationSubscribeDto } from './dto/notification-subscribe.dto';
import { SubscriptionDto } from './dto/subscription.dto';
import { NotificationService } from './notification.service';
import { GetAccount } from '../user/decorator/get-account.decorator';
import { UserEntity } from '../user/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';

@Controller('notification')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('/subscribe-unauthorized')
  async subscribeUnauthtorized(
    @Body()
    notificationSubscribeUnauthtorizedDto: NotificationSubscribeUnauthtorizedDto,
  ): Promise<void> {
    return this.notificationService.subscribeUnauthtorized(
      notificationSubscribeUnauthtorizedDto,
    );
  }

  @Post('/subscribe-authtorized')
  @UseGuards(AuthGuard(), AccountGuard)
  async subscribeAuthtorized(
    @GetAccount() user: UserEntity,
    @Body(ValidationPipe) notificationSubscribeDto: NotificationSubscribeDto,
  ): Promise<SubscriptionDto> {
    return this.notificationService.subscribeAuthtorized(
      user,
      notificationSubscribeDto,
    );
  }

  @Get('/subscribe-status')
  @UseGuards(AuthGuard(), AccountGuard)
  async getSubscribeStatus(
    @GetAccount() user: UserEntity,
  ): Promise<SubscriptionDto> {
    return this.notificationService.getSubscrptionStatus(user);
  }
}
