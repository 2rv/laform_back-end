import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasketController } from './basket.controller';
import { BasketRepository } from './basket.repository';
import { BasketService } from './basket.service';
import { PurchaseProductRepository } from '../purchase-product/purchase-product.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([BasketRepository, PurchaseProductRepository]),
  ],
  providers: [BasketService],
  exports: [BasketService],
  controllers: [BasketController],
})
export class BasketModule {}
