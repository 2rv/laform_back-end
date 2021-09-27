import { Injectable } from '@nestjs/common';

import { UserEntity } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';

import { UserSettingsUpdatePasswordDto } from './dto/user-settings-update-password.dto';
import { UserSettingsUpdateEmailDto } from './dto/user-settings-update-email.dto';

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

  async updateEmail(
    user: UserEntity,
    data: UserSettingsUpdateEmailDto,
  ): Promise<void> {
    return this.userRepository.changeEmail(user, data);
  }
}
