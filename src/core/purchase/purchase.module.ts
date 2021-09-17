import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseController } from './purchase.controller';
import { PurchaseRepository } from './purchase.repository';
import { PurchaseService } from './purchase.service';
import { PurchaseProductModule } from './../purchase-product/purchase-product.module';
import { SizesModule } from '../sizes/sizes.module';
import { ProgramsModule } from '../programs/programs.module';
import { PatternProductModule } from '../pattern-product/pattern-product.module';
import { MasterClassModule } from '../master-class/master-class.module';
import { SewingProductModule } from '../sewing-product/sewing-product.module';

@Module({
  imports: [
    SizesModule,
    ProgramsModule,
    PurchaseProductModule,
    PatternProductModule,
    MasterClassModule,
    SewingProductModule,
    TypeOrmModule.forFeature([PurchaseRepository]),
  ],
  providers: [PurchaseService],
  exports: [PurchaseService],
  controllers: [PurchaseController],
})
export class PurchaseModule {}
