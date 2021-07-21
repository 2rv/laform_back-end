import { PostEntity } from './../core/post/post.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

import { UserEntity } from '../core/user/user.entity';
import { NotificationEntity } from '../core/notification/notification.entity';
import { FileUploadEntity } from 'src/core/file-upload/file-upload.entity';
import { CategoryEntity } from 'src/core/category/category.entity';
import { LikeEntity } from 'src/core/like/like.entity';

const DATABASE_CONFIG = config.get('DATABASE');

export const ApiEntities = [
  UserEntity,
  NotificationEntity,
  CategoryEntity,
  FileUploadEntity,
  PostEntity,
  LikeEntity,
];

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: DATABASE_CONFIG.TYPE,
  url: process.env.DATABASE_URL || DATABASE_CONFIG.URL,
  entities: ApiEntities,
};
