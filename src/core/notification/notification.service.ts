import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NotificationEntity } from './notification.entity';
import { UserEntity } from '../user/user.entity';

import { SubscriptionDto } from './dto/subscription.dto';
import { NotificationSubscribeDto } from './dto/notification-subscribe.dto';
import { NotificationSubscribeUnauthtorizedDto } from './dto/notification-subscribe-unathtorized.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(NotificationEntity)
    private notificationRepository: Repository<NotificationEntity>,
  ) {}

  async getSubscrptionStatus(user: UserEntity): Promise<SubscriptionDto> {
    const subscribtion = await this.notificationRepository.findOne({
      where: { email: user.email },
    });
    return subscribtion ? { subscribe: true } : { subscribe: false };
  }
  async subscribeUnauthtorized(
    notificationSubscribeUnauthtorizedDto: NotificationSubscribeUnauthtorizedDto,
  ): Promise<void> {
    const subscription = await this.notificationRepository.findOne({
      where: { email: notificationSubscribeUnauthtorizedDto.email },
    });

    if (!subscription) {
      const newsubscribe = this.notificationRepository.create(
        notificationSubscribeUnauthtorizedDto,
      );
      await newsubscribe.save();
    }
  }
  async subscribeAuthtorized(
    user: UserEntity,
    notificationSubscribeDto: NotificationSubscribeDto,
  ): Promise<SubscriptionDto> {
    const subscription = await this.notificationRepository.findOne({
      where: { email: user.email },
    });

    if (notificationSubscribeDto.subscribe) {
      if (!subscription) {
        const newsubscribe = this.notificationRepository.create({
          email: user.email,
        });
        return (await newsubscribe.save())
          ? { subscribe: true }
          : { subscribe: false };
      }
      return { subscribe: true };
    }
    if (!notificationSubscribeDto.subscribe) {
      if (subscription) {
        const deleted = await this.notificationRepository.delete(
          subscription.id,
        );
        return deleted.affected ? { subscribe: false } : { subscribe: true };
      }
      return { subscribe: false };
    }
  }
}
