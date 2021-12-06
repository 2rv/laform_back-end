import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '../user/user.entity';

import { UserInfoDto } from './dto/user-info.dto';
import { UserInfoUpdateDto } from './dto/user-info-update.dto';
import { UserInfoEntity } from './user-info.entity';

@Injectable()
export class UserInfoService {
  constructor(
    @InjectRepository(UserInfoEntity)
    private userInfoRepository: Repository<UserInfoEntity>,
  ) {}

  async create(user): Promise<UserInfoDto> {
    return await this.userInfoRepository.save({
      userId: user.id,
      googleId: user?.googleId,
      appleId: user?.appleId,
      facebookId: user?.facebookId,
    });
  }

  async findOne(user: UserEntity): Promise<UserInfoEntity> {
    return await this.userInfoRepository.findOne({
      where: {
        userId: user.id,
      },
    });
  }

  async update(user, body: UserInfoUpdateDto) {
    const result = await this.userInfoRepository.findOne({
      where: {
        userId: user.id,
      },
    });
    await this.userInfoRepository.update(result.id, body);
    return await this.findOne(user);
  }
}
// const testData = {
// 	country: {
// 	  country: user.country,
// 	  country_iso_code: user.country_iso_code,
// 	  label: user.label_country,
// 	},
// 	city: {
// 	  city: user.city,
// 	  fias_id: user.fias_id,
// 	  fias_level: user.fias_level_city,
// 	  kladr_id: user.kladr_id,
// 	  label: user.label_city,
// 	  settlement: user.settlement,
// 	},
// 	street: {
// 	  fias_id: user.fias_id_street,
// 	  fias_level: user.fias_level_street,
// 	  label: user.label_street,
// 	  street: user.street,
// 	},
// 	house: {
// 	  fias_id: user.fias_id_house,
// 	  fias_level: user.fias_level_house,
// 	  house: user.house,
// 	  label: user.label_house,
// 	},
// 	postal_code: {
// 	  label: user.label_postal_code,
// 	  postal_code: user.postal_code,
// 	},
//   };
