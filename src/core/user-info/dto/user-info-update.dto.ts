import { IsEnum, IsOptional, IsString, IsNumber } from 'class-validator';

import { DELIVERY_TYPE } from '../enum/delivery-type.enum';

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
  @IsEnum(DELIVERY_TYPE)
  deliveryType: DELIVERY_TYPE;
}
