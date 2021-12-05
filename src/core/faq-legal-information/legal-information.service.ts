import { Injectable } from '@nestjs/common';
import { LegalInformationEntity } from './legal-information.entity';
import { LegalInformationRepository } from './legal-information.repository';
import { CreateOrUpdateLegalInformationDto } from './dto/create-or-update-legal-information.dto';

@Injectable()
export class LegalInformationService {
  constructor(private legalInformationRepository: LegalInformationRepository) {}

  async get(): Promise<LegalInformationEntity> {
    return await this.legalInformationRepository.findOne({});
  }

  async save(body: CreateOrUpdateLegalInformationDto): Promise<void> {
    await this.legalInformationRepository.createOrUpdate(body);
  }
}
