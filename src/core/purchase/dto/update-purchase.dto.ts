import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { PURCHASE_STATUS } from '../enum/purchase.status';
import { PatternProductEntity } from 'src/core/pattern-product/pattern-product.entity';
import { SewingProductEntity } from 'src/core/sewing-product/sewing-product.entity';
import { MasterClassEntity } from 'src/core/master-class/master-class.entity';
import { ProductOptionEntity } from 'src/core/product-option/product-option.entity';
import { Transform } from 'class-transformer';

export class UpdatePurchaseDto {
  @IsOptional()
  @IsEnum(PURCHASE_STATUS)
  orderStatus: number;

  @IsOptional()
  @IsEmail()
  @Transform((value) => value.toLowerCase())
  @Transform((value) => value.trim())
  email: string;

  @IsOptional()
  @IsString()
  fullName: string;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsPhoneNumber('RU')
  phone: string;

  @IsOptional()
  @IsString()
  comment: string;

  @ValidateNested()
  purchaseProducts: UpdatePurchaseProductDto[];

  @IsOptional()
  @IsString()
  shippingPrice: string;

  @IsOptional()
  @IsString()
  price: string;
}

export class UpdatePurchaseProductDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsOptional()
  @IsUUID()
  masterClassId: MasterClassEntity;

  @IsOptional()
  @IsUUID()
  patternProductId: PatternProductEntity;

  @IsOptional()
  @IsUUID()
  sewingProductId: SewingProductEntity;

  @IsOptional()
  @IsUUID()
  optionId: ProductOptionEntity;

  @IsNotEmpty()
  @IsNumber()
  type: number;

  @IsOptional()
  @IsNumber()
  totalCount: number;

  @IsOptional()
  @IsNumber()
  totalLength: number;

  @IsOptional()
  @IsNumber()
  totalDiscount: number;

  @IsOptional()
  @IsNumber()
  totalPrice: number;
}
