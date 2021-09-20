import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PurchaseDto } from './purchase.dto';
import { PurchaseProductDto } from './purchase-product.dto';

export class CreatePurchaseDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PurchaseDto)
  purchase: PurchaseDto;

  @IsNotEmpty()
  @IsArray()
  purchaseProducts: PurchaseProductDto[];
}
