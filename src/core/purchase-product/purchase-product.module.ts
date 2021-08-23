import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseProductRepository } from './purchase-product.repository';
import { PurchaseProductService } from './purchase-product.service';

@Module({
  imports: [TypeOrmModule.forFeature([PurchaseProductRepository])],
  providers: [PurchaseProductService],
  exports: [PurchaseProductService],
})
export class PurchaseProductModule {}
