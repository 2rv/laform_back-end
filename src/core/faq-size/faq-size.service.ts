import { Injectable } from '@nestjs/common';
import { FaqSizeEntity } from './faq-size.entity';
import { FaqSizeRepository } from './faq-size.repository';
import { CreateOrUpdateFaqSizeDto } from './dto/create-or-update-faq-size.dto';

@Injectable()
export class FaqSizeService {
  constructor(private faqSizeRepository: FaqSizeRepository) {}

  async get(): Promise<FaqSizeEntity> {
    return await this.faqSizeRepository.findOne({});
  }

  async save(body: CreateOrUpdateFaqSizeDto): Promise<void> {
    await this.faqSizeRepository.createOrUpdate(body);
  }
}
