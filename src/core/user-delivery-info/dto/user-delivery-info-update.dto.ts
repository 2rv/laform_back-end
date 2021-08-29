import { IsEnum, IsOptional, IsString } from 'class-validator';

import { DELIVERY_TYPE } from '../enum/delivery-type.enum';

export class UserDeliveryInfoUpdateDto {
  @IsOptional()
  @IsString()
  fullname: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  location: string;

  @IsOptional()
  @IsEnum(DELIVERY_TYPE)
  deliveryType: DELIVERY_TYPE;
}
