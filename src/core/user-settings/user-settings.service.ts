import { BadRequestException, Injectable } from '@nestjs/common';

import { UserEntity } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';

import { UserSettingsUpdatePasswordDto } from './dto/user-settings-update-password.dto';
import { USER_ERROR } from '../user/enum/user-error.enum';

@Injectable()
export class UserSettingsService {
  constructor(private userRepository: UserRepository) {}

  async updatePassword(
    user: UserEntity,
    data: UserSettingsUpdatePasswordDto,
  ): Promise<void> {
    const { newPassword } = data;
    const payload = { password: newPassword };

    this.userRepository.changePassword(user, payload);
  }

  async updateEmail(user: UserEntity, data: any): Promise<void> {
    if (user.email !== data.oldEmail) {
      throw new BadRequestException(USER_ERROR.YOUR_EMAIL_IS_WRONG);
    } else {
      return this.userRepository.changeEmail(user, data.email);
    }
  }
}
