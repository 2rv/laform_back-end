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
import { UserDeliveryInfoModule } from './core/user-delivery-info/user-delivery-info.module';
import { FileUploadModule } from './core/file-upload/file-upload.module';
import { CategoryModule } from './core/category/category.module';
import { PostModule } from './core/post/post.module';
import { PurchaseModule } from './core/purchase/purchase.module';
import { PurchaseProductModule } from './core/purchase-product/purchase-product.module';
import { SewingProductModule } from './core/sewing-product/sewing-product.module';
import { PatternProductModule } from './core/pattern-product/pattern-product.module';
import { PromoCodeModule } from './core/promo-code/promo-code.module';

@Module({
  providers: [],
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    UserSettingsModule,
    NotificationModule,
    UserRecoveryModule,
    UserVerificationModule,
    UserDeliveryInfoModule,
    FileUploadModule,
    CategoryModule,
    PostModule,
    LikeModule,
    SliderModule,
    MasterClassModule,
    PurchaseModule,
    PurchaseProductModule,
    SewingProductModule,
    PatternProductModule,
    PromoCodeModule,
  ],
})
export class AppModule {}
