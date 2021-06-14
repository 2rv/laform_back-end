import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';

import { randomUUID } from 'src/common/utils/hash';
import { UserEntity } from '../user/user.entity';

import {
  UserRecoveryChangePasswordDto,
  UserRecoveryDto,
  PasswordRecoveryEmailDto,
} from './dto/user-recovery.dto';

@Injectable()
export class UserRecoveryService {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async sendEmailPasswordRecovery({ email }: UserRecoveryDto): Promise<void> {
    const user = await this.userRepository.findOne({ email });
    if (!user) return;

    const payload: PasswordRecoveryEmailDto = {
      email: user.email,
      userId: user.id,
    };

    const code = randomUUID();

    await this.cacheManager.set(code, JSON.stringify(payload));

    console.log(`Generated recovery code: ${code}`);
  }

  async changePassword(
    code: string,
    { password }: UserRecoveryChangePasswordDto,
  ): Promise<void> {
    const rawPayload: string = await this.cacheManager.get(code);
    if (!rawPayload) {
      throw new BadRequestException('(WIP) NO_TOKEN');
    }

    const payload: PasswordRecoveryEmailDto = JSON.parse(rawPayload);

    const user = await this.userRepository.findOne({ id: payload.userId });

    try {
      user.password = await UserEntity.hashPassword(password);
      await user.save();
    } catch (err) {}

    this.cacheManager.del(code);
  }
}
