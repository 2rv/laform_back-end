import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';

import { PurchaseProductRepository } from '../purchase-product/purchase-product.repository';
import { PurchaseModule } from '../purchase/purchase.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PurchaseProductRepository]),
    PurchaseModule,
  ],
  providers: [StatisticsService],
  exports: [StatisticsService],
  controllers: [StatisticsController],
})
export class StatisticsModule {}
