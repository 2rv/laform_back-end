import { Repository, EntityRepository } from 'typeorm';
import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

import { USER_ERROR } from './enum/user-error.enum';
import { UserCreateDto } from './dto/user-create.dto';
import { UserChangePasswordDto } from './dto/user-change-password.dto';
import { UserEntity } from './user.entity';

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

  async changePassword(data: UserChangePasswordDto): Promise<void> {
    const { id, password } = data;

    const user = await this.findOne(id);
    if (!user) throw new BadRequestException(USER_ERROR.USER_NOT_FOUND);

    user.password = await UserEntity.hashPassword(password);
    try {
      await user.save();
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }
}
