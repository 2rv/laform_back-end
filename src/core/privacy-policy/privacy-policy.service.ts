import { Injectable } from '@nestjs/common';
import { PrivacyPolicyEntity } from './privacy-policy.entity';
import { PrivacyPolicyRepository } from './privacy-policy.repository';
import { CreateOrUpdatePrivacyPolicyDto } from './dto/create-or-update-privacy-policy.dto';

@Injectable()
export class PrivacyPolicyService {
  constructor(private privacyPolicyRepository: PrivacyPolicyRepository) {}

  async get(): Promise<PrivacyPolicyEntity> {
    return await this.privacyPolicyRepository.findOne({});
  }

  async save(body: CreateOrUpdatePrivacyPolicyDto): Promise<void> {
    await this.privacyPolicyRepository.createOrUpdate(body);
  }
}
