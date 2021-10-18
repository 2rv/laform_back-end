import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SewingProductController } from './sewing-product.controller';
import { SewingProductService } from './sewing-product.service';
import { SewingProductRepository } from './sewing-product.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SewingProductRepository])],
  providers: [SewingProductService],
  exports: [SewingProductService],
  controllers: [SewingProductController],
})
export class SewingProductModule {}
