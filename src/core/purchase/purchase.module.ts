import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseController } from './purchase.controller';
import { PurchaseRepository } from './purchase.repository';
import { PurchaseService } from './purchase.service';
import { PurchaseProductModule } from './../purchase-product/purchase-product.module';

@Module({
  imports: [
    PurchaseProductModule,
    TypeOrmModule.forFeature([PurchaseRepository]),
  ],
  providers: [PurchaseService],
  exports: [PurchaseService],
  controllers: [PurchaseController],
})
export class PurchaseModule {}
