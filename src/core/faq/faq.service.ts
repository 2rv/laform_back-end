import { Injectable } from '@nestjs/common';
import { FaqEntity } from './faq.entity';
import { FaqRepository } from './faq.repository';
import { CreateOrUpdateFaqDto } from './dto/create-or-update-faq.dto';

@Injectable()
export class FaqService {
  constructor(private faqRepository: FaqRepository) {}

  async get(): Promise<FaqEntity> {
    return await this.faqRepository.findOne({});
  }

  async save(body: CreateOrUpdateFaqDto): Promise<FaqEntity> {
    return await this.faqRepository.createOrUpdate(body);
  }
}
