import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatternProductController } from './pattern-product.controller';
import { PatternProductService } from './pattern-product.service';
import { PatternProductRepository } from './pattern-product.repository';
import { ProductOptionModule } from '../product-option/product-option.module';
import { PatternProductEntity } from './pattern-product.entity';
import { PurchaseProductRepository } from '../purchase-product/purchase-product.repository';
import { PageNavigationRepository } from '../page-navigation/page-navigation.repository';
import { ProductOptionRepository } from '../product-option/product-option.repository';

@Module({
  imports: [
    ProductOptionModule,
    TypeOrmModule.forFeature([
      PatternProductRepository,
      PatternProductEntity,
      PurchaseProductRepository,
      PageNavigationRepository,
      ProductOptionRepository,
    ]),
  ],
  providers: [PatternProductService],
  exports: [PatternProductService],
  controllers: [PatternProductController],
})
export class PatternProductModule {}
