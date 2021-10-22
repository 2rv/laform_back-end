import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryPriceRepository } from './delivery-price.repository';
import { DeliveryPriceService } from './delivery-price.service';
import { DeliveryPriceController } from './delivery-price.controller';
import { DeliveryPriceEntity } from './delivery-price.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DeliveryPriceRepository, DeliveryPriceEntity]),
  ],
  providers: [DeliveryPriceService],
  exports: [DeliveryPriceService],
  controllers: [DeliveryPriceController],
})
export class DeliveryPriceModule {}
