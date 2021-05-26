import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NotificationSubscribeDto } from './dto/notification-subscribe.dto';
import { SubscriptionDto } from './dto/subscription.dto';
import { NOTIFICATION_ERROR } from './enum/notification-error.enum';
import { NotificationEntity } from './notification.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(NotificationEntity)
    private notificationRepository: Repository<NotificationEntity>,
  ) {}

  async subscribe(
    notificationSubscribeDto: NotificationSubscribeDto,
  ): Promise<SubscriptionDto> {
    const subscription = this.notificationRepository.create(
      notificationSubscribeDto,
    );

    try {
      await subscription.save();
      return subscription;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(
          NOTIFICATION_ERROR.SUBSCRIPTION_ALREADY_EXISTS,
        );
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
