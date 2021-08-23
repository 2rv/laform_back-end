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
import { PurchaseDto } from './purchase.dto';

export class CreatePurchaseDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PurchaseDto)
  purchase: PurchaseDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PurchaseProductDto)
  purchaseProducts: PurchaseProductDto[];
}
