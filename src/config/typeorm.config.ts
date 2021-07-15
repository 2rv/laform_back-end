import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

import { UserEntity } from '../core/user/user.entity';
import { NotificationEntity } from '../core/notification/notification.entity';
import { FileUploadEntity } from 'src/core/file-upload/file-upload.entity';

const DATABASE_CONFIG = config.get('DATABASE');

export const ApiEntities = [UserEntity, NotificationEntity, FileUploadEntity];

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: DATABASE_CONFIG.TYPE,
  url: process.env.DATABASE_URL || DATABASE_CONFIG.URL,
  entities: ApiEntities,
};
