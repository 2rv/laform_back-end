import {
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  ValidateNested,
  IsString,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PurchaseProductDto } from './purchase-product.dto';

export class PurchaseDto {
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  userId: number;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  discount: number;

  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsString()
  typeOfDelivery: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsNumber()
  phoneNumber: number;

  @IsNotEmpty()
  @IsString()
  typeOfPayment: string;

  @IsOptional()
  @IsString()
  comment: string;
}
