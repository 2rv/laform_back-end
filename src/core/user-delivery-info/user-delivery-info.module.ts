import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserDeliveryInfoEntity } from './user-delivery-info.entity';
import { UserDeliveryInfoController } from './user-delivery-info.controller';
import { UserDeliveryInfoService } from './user-delivery-info.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([UserDeliveryInfoEntity]),
  ],
  controllers: [UserDeliveryInfoController],
  providers: [UserDeliveryInfoService],
  exports: [UserDeliveryInfoService],
})
export class UserDeliveryInfoModule {}
