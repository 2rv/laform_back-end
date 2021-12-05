import { Injectable } from '@nestjs/common';
import { TermsOfUseEntity } from './terms-of-use.entity';
import { TermsOfUseRepository } from './terms-of-use.repository';
import { CreateOrUpdateTermsOfUseDto } from './dto/create-or-update-terms-of-use.dto';

@Injectable()
export class TermsOfUseService {
  constructor(private termsOfUseRepository: TermsOfUseRepository) {}

  async get(): Promise<TermsOfUseEntity> {
    return await this.termsOfUseRepository.findOne({});
  }

  async save(body: CreateOrUpdateTermsOfUseDto): Promise<void> {
    await this.termsOfUseRepository.createOrUpdate(body);
  }
}
