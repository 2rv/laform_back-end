import { Repository, EntityRepository } from 'typeorm';
import {} from '@nestjs/common';

import { PaymentEntity } from './payment.entity';

@EntityRepository(PaymentEntity)
export class PaymentRepository extends Repository<PaymentEntity> {}
