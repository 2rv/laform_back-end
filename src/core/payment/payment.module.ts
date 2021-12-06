import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '../user/user.entity';
import { PaymentController } from './payment.controller';
import { PaymentRepository } from './payment.repository';
import { PaymentService } from './payment.service';
import { PurchaseRepository } from '../purchase/purchase.repository';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      PaymentRepository,
      PurchaseRepository,
    ]),
  ],
})
export class PaymentModule {}
