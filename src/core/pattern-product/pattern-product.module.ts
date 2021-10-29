import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatternProductController } from './pattern-product.controller';
import { PatternProductService } from './pattern-product.service';
import { PatternProductRepository } from './pattern-product.repository';
import { ProductOptionModule } from '../product-option/product-option.module';
import { RecommendationModule } from '../recommendation/recommendation.module';

@Module({
  imports: [
    ProductOptionModule,
    RecommendationModule,
    TypeOrmModule.forFeature([PatternProductRepository]),
  ],
  providers: [PatternProductService],
  exports: [PatternProductService],
  controllers: [PatternProductController],
})
export class PatternProductModule {}
