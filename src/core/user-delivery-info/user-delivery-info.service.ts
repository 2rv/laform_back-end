import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '../user/user.entity';

import { UserDeliveryInfoDto } from './dto/user-delivery-info.dto';
import { UserDeliveryInfoUpdateDto } from './dto/user-delivery-info-update.dto';
import { UserDeliveryInfoEntity } from './user-delivery-info.entity';

@Injectable()
export class UserDeliveryInfoService {
  constructor(
    @InjectRepository(UserDeliveryInfoEntity)
    private userDeliveryInfoRepository: Repository<UserDeliveryInfoEntity>,
  ) {}

  async createDeliveryInfo(user: UserEntity): Promise<UserDeliveryInfoEntity> {
    const userDeliveryInfo: UserDeliveryInfoEntity =
      this.userDeliveryInfoRepository.create({ user });

    try {
      await userDeliveryInfo.save();
      return userDeliveryInfo;
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException();
    }
  }

  async getDeliveryInfo(user: UserEntity): Promise<UserDeliveryInfoDto> {
    try {
      const userDeliveryInfo = await this.userDeliveryInfoRepository.findOne({
        user,
      });
      return userDeliveryInfo;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async updateDeliveryInfo(
    user: UserEntity,
    rawData: UserDeliveryInfoUpdateDto,
  ): Promise<void> {
    const data = Object.keys(rawData).reduce(
      (prev, key) => (!!rawData[key] ? { ...prev, [key]: rawData[key] } : prev),
      {},
    );

    if (!Object.keys(data).length) return;

    try {
      this.userDeliveryInfoRepository.update({ user }, data);
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }
}
