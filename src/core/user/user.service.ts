import { Injectable } from '@nestjs/common';
import { UserEntity } from '../user/user.entity';
import { UserGetSubscriptionStatusDto } from './dto/user-get-subscription-status.dto';

@Injectable()
export class UserService {
  async getSubscriptionStatus(
    user: UserEntity,
  ): Promise<UserGetSubscriptionStatusDto> {
    const userGetSubscriptionStatusDto: UserGetSubscriptionStatusDto = {
      notificationEmail: user.notificationEmail,
    };
    return userGetSubscriptionStatusDto;
  }
}
