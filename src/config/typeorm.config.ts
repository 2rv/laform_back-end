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
import { StatisticsEntity } from 'src/core/statistics/statistics.entity';
import { SdekEntity } from 'src/core/sdek/sdek.entity';

const DATABASE_CONFIG = config.get('DATABASE');
export const ApiEntities = [
  SdekEntity,
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
  StatisticsEntity,
];

// export const typeOrmConfig: TypeOrmModuleOptions = {
//   type: DATABASE_CONFIG.TYPE,
//   url: process.env.DATABASE_URL || DATABASE_CONFIG.URL,
//   entities: ApiEntities,
//   ssl: { rejectUnauthorized: false },
//   //   logging: ['query', 'error'],
//   synchronize: process.env.TYPEORM_SYNC || DATABASE_CONFIG.SYNCHRONIZE,
// };

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'kokni1',
  password: 'nSnS44Tt',
  database: 'postgres',
  synchronize: true,
  entities: ApiEntities,
};
