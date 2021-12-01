import { Repository, EntityRepository } from 'typeorm';
import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

import { USER_ERROR } from './enum/user-error.enum';
import { UserCreateDto } from './dto/user-create.dto';
import { UserChangePasswordDto } from './dto/user-change-password.dto';
import { UserChangeEmailDto } from './dto/user-change-email.dto';
import { UserEntity } from './user.entity';
import { CreateGoogleUseDto } from './dto/create-user-google.dto';
import { CreateFacebookUseDto } from './dto/create-user-facebook.dto';
import { CreateAppleUseDto } from './dto/create-user-apple.dto';
import { USER_ROLE } from './enum/user-role.enum';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async createUser(data: UserCreateDto): Promise<UserEntity> {
    const { login, email, password } = data;

    const user: UserEntity = new UserEntity();
    user.login = login;
    user.email = email;
    user.password = await UserEntity.hashPassword(password);

    try {
      await user.save();
      return user;
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException(USER_ERROR.USER_ALREADY_EXISTS);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async getProfile(userId: number) {
    return await this.createQueryBuilder('user')
      .leftJoin('user.purchase', 'purchases')
      .leftJoin('user.comment', 'comments')
      .leftJoin('user.like', 'likes')
      .leftJoin('likes.postId', 'like_post')
      .leftJoin('like_post.image', 'like_post_image')

      .leftJoin('likes.sewingProductId', 'like_sewing_good')
      .leftJoin('like_sewing_good.images', 'like_sewing_good_images')

      .leftJoin('likes.patternProductId', 'like_pattern_product')
      .leftJoin('like_pattern_product.images', 'like_pattern_product_images')

      .leftJoin('likes.masterClassId', 'like_master_class')
      .leftJoin('like_master_class.images', 'like_master_class_images')

      .leftJoin('comments.postId', 'comment_post')
      .leftJoin('comment_post.image', 'comment_post_image')

      .leftJoin('comments.sewingProductId', 'comment_sewing_good')
      .leftJoin('comment_sewing_good.images', 'comment_sewing_good_images')

      .leftJoin('comments.patternProductId', 'comment_pattern_product')
      .leftJoin(
        'comment_pattern_product.images',
        'comment_pattern_product_images',
      )

      .leftJoin('comments.masterClassId', 'comment_master_class')
      .leftJoin('comment_master_class.images', 'comment_master_class_images')

      .leftJoin('user.userSettingId', 'user_info')
      .select([
        'user.id',
        'user.login',
        'user.email',
        'user.role',
        'user.emailConfirmed',
        'user.notificationEmail',
        'user.createDate',

        'likes',
        'like_post',
        'like_post_image.fileUrl',
        'like_sewing_good',
        'like_sewing_good_images.fileUrl',
        'like_pattern_product',
        'like_pattern_product_images.fileUrl',
        'like_master_class',
        'like_master_class_images.fileUrl',

        'user_info.id',
        'user_info.fullName',
        'user_info.phone',
        'user_info.location',

        'comments',
        'comment_post',
        'comment_post_image',
        'comment_sewing_good',
        'comment_sewing_good_images',
        'comment_pattern_product',
        'comment_pattern_product_images',
        'comment_master_class',
        'comment_master_class_images',

        'purchases',
      ])
      .loadRelationCountAndMap(
        'purchases.purchaseProductsCount',
        'purchases.purchaseProducts',
      )
      .where('user.id = :id', { id: userId })
      .getOne();
  }

  async getAll(size = 30, page = 1): Promise<[UserEntity[], number]> {
    return await this.createQueryBuilder('user')
      .select([
        'user.id',
        'user.login',
        'user.role',
        'user.emailConfirmed',
        'user.notificationEmail',
        'user.googleId',
        'user.appleId',
        'user.facebookId',
        'user.createDate',
      ])
      .orderBy('user.createDate', 'ASC')
      .take(size)
      .skip((page - 1) * size || 0)
      .getManyAndCount();
  }

  async statistics(from: Date, to: Date): Promise<any[]> {
    const role = USER_ROLE.USER;
    return await this.createQueryBuilder('user')
      .where('user.createDate >= :from', { from })
      .andWhere('user.createDate <= :to', { to })
      .andWhere('user.role = :role', { role })
      .getMany();
  }
  async changePassword(
    user: UserEntity,
    data: UserChangePasswordDto,
  ): Promise<void> {
    const { password } = data;

    user.password = await UserEntity.hashPassword(password);

    try {
      await user.save();
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async changeEmail(user: UserEntity, email: string): Promise<void> {
    user.email = email;
    user.emailConfirmed = false;
    user.notificationEmail = false;
    try {
      await user.save();
    } catch (err) {
      if (err.code === '23505') {
        throw new BadRequestException(USER_ERROR.EMAIL_ALREADY_IN_USE);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async confirmEmailById(user: UserEntity): Promise<UserEntity> {
    user.emailConfirmed = true;
    user.notificationEmail = true;
    try {
      await user.save();
      return user;
    } catch (err) {
      throw new BadRequestException();
    }
  }

  async saveGoogleUser(body: CreateGoogleUseDto): Promise<UserEntity> {
    const user: UserEntity = new UserEntity();
    user.googleId = body.googleId;
    user.login = body.login;
    user.email = body.email;

    try {
      await user.save();
      return user;
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException(USER_ERROR.USER_ALREADY_EXISTS);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async saveAppleUser(body: CreateAppleUseDto): Promise<UserEntity> {
    const user: UserEntity = new UserEntity();
    user.appleId = body.appleId;
    user.login = body.login;
    user.email = body.email;

    try {
      await user.save();
      return user;
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException(USER_ERROR.USER_ALREADY_EXISTS);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async saveFacebookUser(body: CreateFacebookUseDto): Promise<UserEntity> {
    const user: UserEntity = new UserEntity();
    user.facebookId = body.facebookId;
    user.login = body.login;
    user.email = body.email;

    try {
      await user.save();
      return user;
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException(USER_ERROR.USER_ALREADY_EXISTS);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
