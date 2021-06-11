import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { randomUUID } from 'src/common/utils/hash';
import { UserEntity } from '../user/user.entity';

import { UserRecoveryDto } from './dto/user-recovery.dto';

@Injectable()
export class UserRecoveryService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async recover({ email }: UserRecoveryDto) {
    const user = await this.userRepository.findOne({ email });
    if (!user) return;

    const code = randomUUID();
    console.log(`Generated recovery code: ${code}`);
  }
}
