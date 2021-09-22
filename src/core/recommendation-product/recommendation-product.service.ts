import { Injectable } from '@nestjs/common';
import { RecommendationProductRepository } from './recommendation-product.repository';

@Injectable()
export class PurchaseProductService {
  constructor(
    private recommendationProductRepository: RecommendationProductRepository,
  ) {}

  create(body: any): any {
    return this.recommendationProductRepository.create(body);
  }

  async update(id: any, body: any) {
    return await this.recommendationProductRepository.update(id, body);
  }

  async delete(id: string) {
    return await this.recommendationProductRepository.delete(id);
  }
}
