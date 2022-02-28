import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsEmail,
  IsPhoneNumber,
  IsBoolean,
  IsEnum,
} from 'class-validator';
import { DELIVERY_TYPE } from './../enum/purchase.status';
export class PurchaseDto {
  @IsOptional()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsEmail()
  @Transform((value) => value.toLowerCase())
  @Transform((value) => value.trim())
  email: string;

  @IsOptional()
  @IsString()
  @Transform((value) => value.toLowerCase())
  @Transform((value) => value.trim())
  emailConfirmCode: string;

  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsPhoneNumber('RU')
  phone: string;

  @IsOptional()
  @IsString()
  comment: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  promoCodeDiscount: number;

  @IsOptional()
  @IsString()
  promoCode: string;

  @IsOptional()
  @IsNumber()
  shippingPrice: number;

  @IsNotEmpty()
  @IsBoolean()
  sdek: boolean;

  @IsOptional()
  @IsNumber()
  sdekTariffCode: number;

  @IsOptional()
  @IsNumber()
  sdekCityCode: number;

  @IsOptional()
  @IsString()
  sdekPointAddress: string;

  @IsOptional()
  @IsString()
  sdekTariffName: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsEnum(DELIVERY_TYPE)
  deliveryType: DELIVERY_TYPE;
}
