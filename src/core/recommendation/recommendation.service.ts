import { Injectable } from '@nestjs/common';
import { RecommendationRepository } from './recommendation.repository';
import { CreateRecommendationDto } from './dto/create-recommendation.dto';
import { RecommendationEntity } from './recommendation.entity';
import { RecommendationDto } from './dto/recommendation.dto';

@Injectable()
export class RecommendationService {
  constructor(private recommendationRepository: RecommendationRepository) {}

  async create(body): Promise<any> {
    return await this.recommendationRepository.create(body);
  }

  async save(body: CreateRecommendationDto): Promise<any> {
    const recommendation = await this.create(body.recommendation);
    recommendation.recommendationProducts = body.recommendationProducts;
    return await this.recommendationRepository.save({
      ...recommendation,
    });
  }
}
