import { PurchaseProductEntity } from 'src/core/purchase-product/purchase-product.entity';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

import { CreatePurchaseDto } from './create-purchase.dto';

export class GetPurchaseProduct {
  @IsNotEmpty()
  countOfProducts: number;

  @IsNotEmpty()
  basket: Object;
}
