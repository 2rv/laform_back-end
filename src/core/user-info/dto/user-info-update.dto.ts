import { IsEnum, IsOptional, IsString } from 'class-validator';

import { DELIVERY_TYPE } from '../enum/delivery-type.enum';
import { PAYMENT_TYPE } from '../enum/payment-type.enum';

export class UserInfoUpdateDto {
  @IsOptional()
  @IsString()
  fullName: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  location: string;

  @IsOptional()
  @IsString()
  deliveryType: string;

  @IsOptional()
  @IsEnum(PAYMENT_TYPE)
  paymentType: PAYMENT_TYPE;
}
