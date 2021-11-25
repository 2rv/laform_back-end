import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

import { UserEntity } from '../core/user/user.entity';
import { NotificationEntity } from '../core/notification/notification.entity';
import { UserInfoEntity } from '../core/user-info/user-info.entity';
import { FileUploadEntity } from 'src/core/file-upload/file-upload.entity';
import { CategoryEntity } from 'src/core/category/category.entity';
import { LikeEntity } from 'src/core/like/like.entity';
import { PostEntity } from './../core/post/post.entity';
import { SliderEntity } from './../core/slider/slider.entity';
import { PurchaseEntity } from './../core/purchase/purchase.entity';
import { PurchaseProductEntity } from 'src/core/purchase-product/purchase-product.entity';
import { SewingProductEntity } from './../core/sewing-product/sewing-product.entity';
import { MasterClassEntity } from './../core/master-class/master-class.entity';
import { PatternProductEntity } from 'src/core/pattern-product/pattern-product.entity';
import { PromoCodeEntity } from '../core/promo-code/promo-code.entity';
import { RecommendationEntity } from 'src/core/recommendation/recommendation.entity';
import { RecommendationProductEntity } from 'src/core/recommendation-product/recommendation-product.entity';
import {
  CommentEntity,
  SubCommentEntity,
} from 'src/core/comment/comment.entity';
import { AboutUsEntity } from 'src/core/about-us/about-us.entity';
import { DeliveryPriceEntity } from 'src/core/delivery-price/delivery-price.entity';
import { ProductOptionEntity } from 'src/core/product-option/product-option.entity';
import { FaqEntity } from 'src/core/faq/faq.entity';
import { PaymentEntity } from 'src/core/payment/payment.entity';
import { PrivacyPolicyEntity } from 'src/core/privacy-policy/privacy-policy.entity';
import { LegalInformationEntity } from 'src/core/legal-information/legal-information.entity';
import { TermsOfUseEntity } from 'src/core/terms-of-use/terms-of-use.entity';
import { CompilationProductEntity } from 'src/core/compilation-product/compilation-product.entity';
import { CompilationEntity } from 'src/core/compilation/compilation.entity';

const DATABASE_CONFIG = config.get('DATABASE');
export const ApiEntities = [
  UserEntity,
  UserInfoEntity,
  NotificationEntity,
  NotificationEntity,
  CategoryEntity,
  FileUploadEntity,
  PostEntity,
  LikeEntity,
  SliderEntity,
  MasterClassEntity,
  PurchaseEntity,
  PurchaseProductEntity,
  SewingProductEntity,
  PatternProductEntity,
  PromoCodeEntity,
  ProductOptionEntity,
  CommentEntity,
  SubCommentEntity,
  RecommendationEntity,
  RecommendationProductEntity,
  AboutUsEntity,
  DeliveryPriceEntity,
  FaqEntity,
  PaymentEntity,
  PrivacyPolicyEntity,
  LegalInformationEntity,
  TermsOfUseEntity,
  CompilationEntity,
  CompilationProductEntity,
];

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: DATABASE_CONFIG.TYPE,
  url: process.env.DATABASE_URL || DATABASE_CONFIG.URL,
  entities: ApiEntities,
  ssl: { rejectUnauthorized: false },
  //   logging: ['query', 'error'],
  synchronize: process.env.TYPEORM_SYNC || DATABASE_CONFIG.SYNCHRONIZE,
};

