import { MasterClassModule } from './core/master-class/master-class.module';
import { LikeModule } from './core/like/like.module';
import { SliderModule } from './core/slider/slider.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './core/auth/auth.module';
import { UserSettingsModule } from './core/user-settings/user-settings.module';
import { NotificationModule } from './core/notification/notification.module';
import { UserRecoveryModule } from './core/user-recovery/user-recovery.module';
import { UserVerificationModule } from './core/user-verification/user-verification.module';
import { FileUploadModule } from './core/file-upload/file-upload.module';
import { CategoryModule } from './core/category/category.module';
import { PostModule } from './core/post/post.module';
import { PatternProductModule } from './core/pattern-product/pattern-product.module';

@Module({
  providers: [],
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    UserSettingsModule,
    NotificationModule,
    UserRecoveryModule,
    UserVerificationModule,
    FileUploadModule,
    CategoryModule,
    PostModule,
    LikeModule,
    SliderModule,
    MasterClassModule,
    PatternProductModule,
  ],
})
export class AppModule {}
