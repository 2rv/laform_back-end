import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';

import { randomUUID } from 'src/common/utils/hash';
import { UserRepository } from '../user/user.repository';
import { USER_ERROR } from '../user/enum/user-error.enum';

import { USER_RECOVERY_ERROR } from './enum/user-recovery-error.enum';
import { UserRecoveryDto } from './dto/user-recovery.dto';
import { UserRecoveryGetCodeDto } from './dto/user-recovery-get-code.dto';
import { UserRecoveryChangeCredentialsDto } from './dto/user-recovery-change-password.dto';

@Injectable()
export class UserRecoveryService {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
    private userRepository: UserRepository,
  ) {}

  async getRecoveryCode({ email }: UserRecoveryDto): Promise<void> {
    const user = await this.userRepository.findOne({ email });
    if (!user) throw new BadRequestException(USER_ERROR.USER_NOT_FOUND);

    const payload: UserRecoveryGetCodeDto = {
      email: user.email,
      userId: user.id,
    };

    const code = randomUUID();

    await this.cacheManager.set(code, JSON.stringify(payload));

    console.log(`Generated recovery code: ${code}`);
  }

  async changeCredentials(
    code: string,
    { password }: UserRecoveryChangeCredentialsDto,
  ): Promise<void> {
    if (!code) {
      throw new BadRequestException(USER_RECOVERY_ERROR.TOKEN_DOESNT_EXISTS);
    }

    const rawPayload: string = await this.cacheManager.get(code);
    if (!rawPayload) {
      throw new BadRequestException(USER_RECOVERY_ERROR.TOKEN_DOESNT_EXISTS);
    }

    const { userId }: UserRecoveryGetCodeDto = JSON.parse(rawPayload);

    try {
      this.userRepository.changePassword({ id: userId, password });
    } catch (err) {
      throw new InternalServerErrorException(
        USER_RECOVERY_ERROR.USER_UPDATE_CREDENTIALS_ERROR,
      );
    }

    this.cacheManager.del(code);
  }
}
