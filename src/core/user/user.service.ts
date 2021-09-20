import { Injectable } from '@nestjs/common';
import { UserEntity } from '../user/user.entity';
import { UserGetEmailDto } from './dto/user-get-email.dto';

@Injectable()
export class UserService {
  async getUserEmail(user: UserEntity): Promise<UserGetEmailDto> {
    const userGetEmailDto: UserGetEmailDto = {
      email: user.email,
    };
    return userGetEmailDto;
  }
}
