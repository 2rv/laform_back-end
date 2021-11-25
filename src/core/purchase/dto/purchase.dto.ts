import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsEmail,
} from 'class-validator';

export class PurchaseDto {
  @IsOptional()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  emailConfirmCode: string;

  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  comment: string;

  @IsNotEmpty()
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
}
