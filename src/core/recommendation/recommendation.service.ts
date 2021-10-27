import { Injectable } from '@nestjs/common';
import { RecommendationEntity } from './recommendation.entity';
import { RecommendationRepository } from './recommendation.repository';

@Injectable()
export class RecommendationService {
  constructor(private recommendationRepository: RecommendationRepository) {}

  async update(id: string, body: any) {
    const recommendations: RecommendationEntity =
      await this.recommendationRepository.findOneOrFail(id);
    Object.assign(recommendations, { ...body });
    console.log(recommendations);

    return await this.recommendationRepository.save(recommendations);
  }
}
