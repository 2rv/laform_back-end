import { Injectable } from '@nestjs/common';

import { GetAccountEmailDto } from './dto/get-account-email.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  async getAccountEmail(user: UserEntity): Promise<GetAccountEmailDto> {
    return { email: user.email };
  }
}
