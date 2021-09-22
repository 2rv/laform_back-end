import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RecommendationRepository } from './recommendation.repository';
import { RecommendationService } from './recommendation.service';
import { RecommendationController } from './recommendation.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RecommendationRepository])],
  providers: [RecommendationService],
  exports: [RecommendationService],
  controllers: [RecommendationController],
})
export class RecommendationModule {}
