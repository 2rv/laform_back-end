import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { PurchaseProductRepository } from '../purchase-product/purchase-product.repository';
import { PurchaseRepository } from '../purchase/purchase.repository';
import { UserRepository } from '../user/user.repository';
import { PageNavigationRepository } from '../page-navigation/page-navigation.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PurchaseProductRepository,
      PurchaseRepository,
      UserRepository,
      PageNavigationRepository,
    ]),
  ],
  providers: [StatisticsService],
  exports: [StatisticsService],
  controllers: [StatisticsController],
})
export class StatisticsModule {}
