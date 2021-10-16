import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { UserEntity } from './user.entity';
import { UserGetEmailDto } from './dto/user-get-email.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private userRepository: UserRepository,
  ) {}
  async getUserEmail(user: UserEntity): Promise<UserGetEmailDto> {
    const userGetEmailDto: UserGetEmailDto = {
      email: user.email,
    };
    return userGetEmailDto;
  }

  async getProfile(userId: number): Promise<any> {
    return await this.userRepository.getProfile(userId);
  }

  async getAll(): Promise<any> {
    return await this.userRepository.getAll();
  }

  async updateOne(id: number, body: any): Promise<any> {
    return await this.userRepository.update(id, body);
  }

  async getUserNotificationEmail(user: UserEntity): Promise<boolean> {
    return user.notificationEmail;
  }

  async unsubscribeNotification(code: string): Promise<any> {
    const rawPayload: string = await this.cacheManager.get(code);

    if (rawPayload) {
      const { email } = JSON.parse(rawPayload);
      await this.userRepository.update({ email }, { notificationEmail: false });
    } else {
      throw new InternalServerErrorException();
    }

    this.cacheManager.del(code);
  }
}
