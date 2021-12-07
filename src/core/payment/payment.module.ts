import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { PaymentController } from './payment.controller';
import { PaymentRepository } from './payment.repository';
import { PaymentService } from './payment.service';
import { PurchaseRepository } from '../purchase/purchase.repository';
import { SdekModule } from '../sdek/sdek.module';
import { PurchaseProductRepository } from '../purchase-product/purchase-product.repository';
// import { PurchaseModule } from '../purchase/purchase.module';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
  imports: [
    SdekModule,
    // forwardRef(() => PurchaseModule),
    TypeOrmModule.forFeature([
      UserEntity,
      PaymentRepository,
      PurchaseRepository,
      PurchaseProductRepository,
    ]),
  ],
})
export class PaymentModule {}
