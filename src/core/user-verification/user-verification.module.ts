import { Module, CacheModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CacheModuleConfig } from 'src/config/cache.config';
import { AuthModule } from '../auth/auth.module';
import { MailModule } from '../mail/mail.module';
import { UserEntity } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';

import { UserVerificationController } from './user-verification.controller';
import { UserVerificationService } from './user-verification.service';

import { NotificationModule } from '../notification/notification.module';
import { PurchaseRepository } from '../purchase/purchase.repository';

@Module({
  imports: [
    CacheModule.register(CacheModuleConfig),
    TypeOrmModule.forFeature([UserRepository, UserEntity, PurchaseRepository]),
    AuthModule,
    MailModule,
    NotificationModule,
  ],
  controllers: [UserVerificationController],
  providers: [UserVerificationService],
})
export class UserVerificationModule {}
