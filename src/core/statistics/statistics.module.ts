import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatisticsRepository } from './statistics.repository';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { StatisticsEntity } from './statistics.entity';
import { PurchaseModule } from '../purchase/purchase.module';
import { PurchaseEntity } from '../purchase/purchase.entity';
import { PurchaseRepository } from '../purchase/purchase.repository';
import { PurchaseProductRepository } from '../purchase-product/purchase-product.repository';

@Module({
  imports: [
    PurchaseModule,
    TypeOrmModule.forFeature([
      StatisticsRepository,
      StatisticsEntity,
      PurchaseRepository,
      PurchaseEntity,
      PurchaseProductRepository,
    ]),
  ],
  providers: [StatisticsService],
  exports: [StatisticsService],
  controllers: [StatisticsController],
})
export class StatisticsModule {}
