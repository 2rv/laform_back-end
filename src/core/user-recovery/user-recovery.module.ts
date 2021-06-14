import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CacheModuleConfig } from 'src/config/cache.config';
import { UserRepository } from '../user/user.repository';

import { UserRecoveryController } from './user-recovery.controller';
import { UserRecoveryService } from './user-recovery.service';

@Module({
  imports: [
    CacheModule.register(CacheModuleConfig),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [UserRecoveryController],
  providers: [UserRecoveryService],
})
export class UserRecoveryModule {}
