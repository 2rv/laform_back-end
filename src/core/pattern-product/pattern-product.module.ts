import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatternProductController } from './pattern-product.controller';
import { PatternProductService } from './pattern-product.service';
import { PatternProductRepository } from './pattern-product.repository';
import { ProductOptionModule } from '../product-option/product-option.module';
import { RecommendationModule } from '../recommendation/recommendation.module';
import { PatternProductEntity } from './pattern-product.entity';
import { PurchaseProductRepository } from '../purchase-product/purchase-product.repository';
import { PageNavigationRepository } from '../page-navigation/page-navigation.repository';

@Module({
  imports: [
    ProductOptionModule,
    RecommendationModule,
    TypeOrmModule.forFeature([
      PatternProductRepository,
      PatternProductEntity,
      PurchaseProductRepository,
      PageNavigationRepository,
    ]),
  ],
  providers: [PatternProductService],
  exports: [PatternProductService],
  controllers: [PatternProductController],
})
export class PatternProductModule {}
