import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SewingProductController } from './sewing-product.controller';
import { SewingProductService } from './sewing-product.service';
import { SewingProductRepository } from './sewing-product.repository';
import { ProductOptionModule } from '../product-option/product-option.module';
import { SewingProductEntity } from './sewing-product.entity';
import { PurchaseProductRepository } from '../purchase-product/purchase-product.repository';
import { PageNavigationRepository } from '../page-navigation/page-navigation.repository';

@Module({
  imports: [
    ProductOptionModule,
    TypeOrmModule.forFeature([
      SewingProductRepository,
      SewingProductEntity,
      PurchaseProductRepository,
      PageNavigationRepository,
    ]),
  ],
  providers: [SewingProductService],
  exports: [SewingProductService],
  controllers: [SewingProductController],
})
export class SewingProductModule {}
