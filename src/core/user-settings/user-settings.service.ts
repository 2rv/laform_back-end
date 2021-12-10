import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UserEntity } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { UserSettingsUpdatePasswordDto } from './dto/user-settings-update-password.dto';
import { UserSettingsUpdateEmailDto } from './dto/user-settings-update-email.dto';
import { randomUUID } from 'crypto';
import { Cache } from 'cache-manager';
import { MailService } from '../mail/mail.service';
import { USER_ERROR } from '../user/enum/user-error.enum';

@Injectable()
export class UserSettingsService {
  constructor(
    private userRepository: UserRepository,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private mailService: MailService,
  ) {}

  async updatePassword(
    user: UserEntity,
    data: UserSettingsUpdatePasswordDto,
  ): Promise<void> {
    const { newPassword } = data;
    const payload = { password: newPassword };

    this.userRepository.changePassword(user, payload);
  }

  async changeEmail(
    user: UserEntity,
    data: UserSettingsUpdateEmailDto,
  ): Promise<void> {
    if (user.email === data.newEmail) {
      throw new BadRequestException(
        USER_ERROR.MAIL_ALREADY_LINKED_TO_THIS_ACCOUNT,
      );
    }

    const newEmailData = {
      userId: user.id,
      email: data.newEmail,
    };
    const code = randomUUID();
    await this.cacheManager.set(code, JSON.stringify(newEmailData));
    await this.mailService.sendCodeForChangeMail(
      user.email,
      data.newEmail,
      code,
    );
  }
}
