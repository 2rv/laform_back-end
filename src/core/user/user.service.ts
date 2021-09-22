import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UserGetEmailDto } from './dto/user-get-email.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}
  async getUserEmail(user: UserEntity): Promise<UserGetEmailDto> {
    const userGetEmailDto: UserGetEmailDto = {
      email: user.email,
    };
    return userGetEmailDto;
  }

  async getProfile(userId: number): Promise<any> {
    return await this.userRepository.getProfile(userId);
  }
}
