import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

import { UserEntity } from '../core/user/user.entity';
import { NotificationEntity } from '../core/notification/notification.entity';
import { UserDeliveryInfoEntity } from '../core/user-delivery-info/user-delivery-info.entity';
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
import { ProgramEntity } from 'src/core/program/program-entity';
import { ColorsEntity } from 'src/core/colors/colors.entity';
import { SizesEntity } from 'src/core/sizes/sizes.entity';

const DATABASE_CONFIG = config.get('DATABASE');

export const ApiEntities = [
  UserEntity,
  UserDeliveryInfoEntity,
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
  ProgramEntity,
  ColorsEntity,
  SizesEntity,
];

// export const typeOrmConfig: TypeOrmModuleOptions = {
//   type: DATABASE_CONFIG.TYPE,
//   url: process.env.DATABASE_URL || DATABASE_CONFIG.URL,
//   entities: ApiEntities,
//   ssl: { rejectUnauthorized: false },
//   logging: ['query', 'error'],
//   synchronize: process.env.TYPEORM_SYNC || DATABASE_CONFIG.SYNCHRONIZE,
// };
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pasha1neo',
  database: 'laforme',
  synchronize: true,
  entities: ApiEntities,
};
