import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseProductEntity } from './purchase-product.entity';
import { PurchaseProductRepository } from './purchase-product.repository';
import { PurchaseProductService } from './purchase-product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PurchaseProductRepository,
      PurchaseProductEntity,
    ]),
  ],
  providers: [PurchaseProductService],
  exports: [PurchaseProductService],
})
export class PurchaseProductModule {}
