import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SewingProductController } from './sewing-product.controller';
import { SewingProductService } from './sewing-product.service';
import { SewingProductRepository } from './sewing-product.repository';
import { ProductOptionModule } from '../product-option/product-option.module';
import { RecommendationModule } from '../recommendation/recommendation.module';

@Module({
  imports: [
    ProductOptionModule,
    RecommendationModule,
    TypeOrmModule.forFeature([SewingProductRepository]),
  ],
  providers: [SewingProductService],
  exports: [SewingProductService],
  controllers: [SewingProductController],
})
export class SewingProductModule {}
