import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FaqDeliveryPaymentRepository } from './faq-delivery-payment.repository';
import { FaqDeliveryPaymentService } from './faq-delivery-payment.service';
import { FaqDeliveryPaymentController } from './faq-delivery-payment.controller';
import { FaqDeliveryPaymentEntity } from './faq-delivery-payment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FaqDeliveryPaymentRepository,
      FaqDeliveryPaymentEntity,
    ]),
  ],
  providers: [FaqDeliveryPaymentService],
  exports: [FaqDeliveryPaymentService],
  controllers: [FaqDeliveryPaymentController],
})
export class FaqDeliveryPaymentModule {}
