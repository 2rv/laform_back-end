import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PurchaseDto } from './purchase.dto';

import { PurchaseProductEntity } from 'src/core/purchase-product/purchase-product.entity';

export class CreatePurchaseDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PurchaseDto)
  purchase: PurchaseDto;

  @IsNotEmpty()
  purchaseProducts: PurchaseProductEntity[];
}
