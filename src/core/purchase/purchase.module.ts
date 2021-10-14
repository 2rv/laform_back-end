import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseController } from './purchase.controller';
import { PurchaseRepository } from './purchase.repository';
import { PurchaseService } from './purchase.service';
import { PatternProductModule } from '../pattern-product/pattern-product.module';
import { MasterClassModule } from '../master-class/master-class.module';
import { SewingProductModule } from '../sewing-product/sewing-product.module';
import { PromoCodeModule } from '../promo-code/promo-code.module';
import { PurchaseProductModule } from '../purchase-product/purchase-product.module';
import { CacheModuleConfig } from 'src/config/cache.config';

@Module({
  imports: [
    CacheModule.register(CacheModuleConfig),
    PromoCodeModule,
    PatternProductModule,
    MasterClassModule,
    SewingProductModule,
    PurchaseProductModule,
    TypeOrmModule.forFeature([PurchaseRepository]),
  ],
  providers: [PurchaseService],
  exports: [PurchaseService],
  controllers: [PurchaseController],
})
export class PurchaseModule {}
