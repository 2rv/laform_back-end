import { PurchaseProductDto } from './purchase-product.dto';

export class VerifyPurchaseProductsDto {
  verifiedPurchaseProducts: PurchaseProductDto[];
  price: number;
}
