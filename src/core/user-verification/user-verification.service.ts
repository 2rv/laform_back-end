import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Cache } from 'cache-manager';

import { randomUUID } from 'src/common/utils/hash';
import { UserEntity } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';

import { USER_VERIFICATION_ERROR } from './enum/user-verification-error.enum';
import { UserVerificationEmailPayload } from './type/user-verification-email-payload.type';

@Injectable()
export class UserVerificationService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private userRepository: UserRepository,
  ) {}

  async getEmailVerificationCode(user: UserEntity): Promise<void> {
    if (user.emailConfirmed) {
      throw new BadRequestException(
        USER_VERIFICATION_ERROR.USER_VERIFICATION_EMAIL_ALREADY_CONFIRMED,
      );
    }

    const data: UserVerificationEmailPayload = {
      email: user.email,
      userId: user.id,
    };

    const code = randomUUID();

    await this.cacheManager.set(code, JSON.stringify(data));

    console.log(code);
  }

  async confirmUserVerificationEmail(code: string): Promise<void> {
    const rawPayload: string = await this.cacheManager.get(code);
    if (!rawPayload) {
      throw new BadRequestException(
        USER_VERIFICATION_ERROR.USER_VERIFICATION_EMAIL_CODE_DOESNT_EXISTS,
      );
    }

    const payload: UserVerificationEmailPayload = JSON.parse(rawPayload);

    await this.userRepository.confirmEmailById(payload.userId);

    this.cacheManager.del(code);
  }
}
