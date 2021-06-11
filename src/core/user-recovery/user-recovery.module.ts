import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '../user/user.entity';

import { UserRecoveryController } from './user-recovery.controller';
import { UserRecoveryService } from './user-recovery.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserRecoveryController],
  providers: [UserRecoveryService],
})
export class UserRecoveryModule {}
