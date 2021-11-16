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
import { UserModule } from './core/user/user.module';
import { UserInfoModule } from './core/user-info/user-info.module';
import { FileUploadModule } from './core/file-upload/file-upload.module';
import { CategoryModule } from './core/category/category.module';
import { PostModule } from './core/post/post.module';
import { PurchaseModule } from './core/purchase/purchase.module';
import { PurchaseProductModule } from './core/purchase-product/purchase-product.module';
import { SewingProductModule } from './core/sewing-product/sewing-product.module';
import { PatternProductModule } from './core/pattern-product/pattern-product.module';
import { PromoCodeModule } from './core/promo-code/promo-code.module';
import { MailModule } from './core/mail/mail.module';
import { ProductOptionModule } from './core/product-option/product-option.module';
import { CommentModule } from './core/comment/comment.module';
import { AboutUsModule } from './core/about-us/about-us.module';
import { DeliveryPriceModule } from './core/delivery-price/delivery-price.module';
import { FaqModule } from './core/faq/faq.module';
import { StatisticsModule } from './core/statistics/statistics.module';
import { PaymentModule } from './core/payment/payment.module';
import { PrivacyPolicyModule } from './core/privacy-policy/privacy-policy.module';
import { LegalInformationModule } from './core/legal-information/legal-information.module';
import { TermsOfUseModule } from './core/terms-of-use/terms-of-use.module';
import { CompilationModule } from './core/compilation/compilation.module';


@Module({
  providers: [],
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    ProductOptionModule,
    UserSettingsModule,
    NotificationModule,
    UserRecoveryModule,
    UserVerificationModule,
    UserModule,
    UserInfoModule,
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
    MailModule,
    CommentModule,
    AboutUsModule,
    DeliveryPriceModule,
    FaqModule,
    StatisticsModule,
    PaymentModule,
    PrivacyPolicyModule,
    LegalInformationModule,
    TermsOfUseModule,
    CompilationModule,
  ],
})
export class AppModule {}
