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

  async createUserWithGoogle(data: any): Promise<any> {
    const { email, googleId } = data;

    const user: UserEntity = new UserEntity();
    user.googleId = googleId;
    user.email = email;
    user.emailConfirmed = true;

    try {
      const findUser = await this.findOne({ googleId: googleId });
      if (findUser) {
        return findUser;
      } else await user.save();
      return user;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async createUserWithFacebook(data: any): Promise<any> {
    const { email, facebookId } = data;

    const user: UserEntity = new UserEntity();
    user.facebookId = facebookId;
    user.email = email;
    user.emailConfirmed = true;

    try {
      const findUser = await this.findOne({ facebookId: facebookId });
      if (findUser) {
        return findUser;
      } else await user.save();
      return user;
    } catch (err) {
      throw new InternalServerErrorException();
    }
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

  async changeEmail(user: UserEntity, data: UserChangeEmailDto): Promise<void> {
    const { email } = data;

    user.email = email;
    try {
      await user.save();
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async confirmEmailById(userId: number): Promise<void> {
    try {
      this.update(userId, { emailConfirmed: true });
    } catch {
      throw new BadRequestException();
    }
  }
}
