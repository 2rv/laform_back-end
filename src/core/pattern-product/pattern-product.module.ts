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
import { CategoryRepository } from '../category/category.repository';
import { FileUploadModule } from '../file-upload/file-upload.module';
import { FileUploadRepository } from '../file-upload/file-upload.repository';
import { ProductOptionRepository } from '../product-option/product-option.repository';

@Module({
  imports: [
    ProductOptionModule,
    RecommendationModule,
    FileUploadModule,
    TypeOrmModule.forFeature([
      PatternProductRepository,
      PatternProductEntity,
      PurchaseProductRepository,
      PageNavigationRepository,
      CategoryRepository,
      FileUploadRepository,
      ProductOptionRepository,
    ]),
  ],
  providers: [PatternProductService],
  exports: [PatternProductService],
  controllers: [PatternProductController],
})
export class PatternProductModule {}
