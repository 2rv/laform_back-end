import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';

import { PurchaseProductRepository } from '../purchase-product/purchase-product.repository';
import { PurchaseRepository } from '../purchase/purchase.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([PurchaseProductRepository, PurchaseRepository]),
  ],
  providers: [StatisticsService],
  exports: [StatisticsService],
  controllers: [StatisticsController],
})
export class StatisticsModule {}
