import { Injectable } from '@nestjs/common';
import { AboutUsEntity } from './about-us.entity';
import { AboutUsRepository } from './about-us.repository';
import { CreateOrUpdateAboutUsDto } from './dto/create-or-update-about-us.dto';

@Injectable()
export class AboutUsService {
  constructor(private aboutUsRepository: AboutUsRepository) {}

  async get(): Promise<AboutUsEntity> {
    return await this.aboutUsRepository.findOne({});
  }

  async save(body: CreateOrUpdateAboutUsDto): Promise<void> {
    await this.aboutUsRepository.createOrUpdate(body);
  }
}
