import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterClassController } from './master-class.controller';
import { MasterClassService } from './master-class.service';
import { MasterClassRepository } from './master-class.repository';
import { MasterClassEntity } from './master-class.entity';
import { PurchaseProductRepository } from '../purchase-product/purchase-product.repository';
import { PageNavigationRepository } from '../page-navigation/page-navigation.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MasterClassRepository,
      MasterClassEntity,
      PurchaseProductRepository,
      PageNavigationRepository,
    ]),
  ],
  providers: [MasterClassService],
  exports: [MasterClassService],
  controllers: [MasterClassController],
})
export class MasterClassModule {}
