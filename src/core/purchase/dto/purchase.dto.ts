import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsEmail,
  IsPhoneNumber,
  IsMobilePhone,
  IsBoolean,
} from 'class-validator';

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
  address: string;
}
