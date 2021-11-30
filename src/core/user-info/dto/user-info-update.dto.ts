import { IsEnum, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { PAYMENT_TYPE } from '../enum/payment-type.enum';

export class UserInfoUpdateDto {
  @IsOptional()
  @IsString()
  fullName: string;

  @IsOptional()
  @IsPhoneNumber('RU')
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
