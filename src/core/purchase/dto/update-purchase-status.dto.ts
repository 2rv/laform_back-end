import { IsEnum, IsNotEmpty } from 'class-validator';
import { PURCHASE_STATUS } from '../enum/purchase.status';

export class UpdatePurchaseStatusDto {
  @IsNotEmpty()
  @IsEnum(PURCHASE_STATUS)
  orderStatus: number;
}
