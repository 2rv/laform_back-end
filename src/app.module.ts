import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './core/auth/auth.module';
import { UserModule } from './core/user/user.module';
import { UserSettingsModule } from './core/user-settings/user-settings.module';
import { NotificationModule } from './core/notification/notification.module';
import { UserRecoveryModule } from './core/user-recovery/user-recovery.module';
import { UserVerificationModule } from './core/user-verification/user-verification.module';

@Module({
  providers: [],
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    UserModule,
    UserSettingsModule,
    NotificationModule,
    UserRecoveryModule,
    UserVerificationModule,
  ],
})
export class AppModule {}
