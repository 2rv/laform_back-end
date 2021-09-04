import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';

import { PURCHASE_PRODUCT_ERROR } from '../enum/purchase-product.enum';
import { PurchaseProductRepository } from '../purchase-product.repository';

@Injectable()
export class PurchaseProductGuard implements CanActivate {
  constructor(private purchaseProductRepository: PurchaseProductRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { params } = request;

    if (!params.purchaseProductId) {
      throw new BadRequestException();
    }

    const purchaseProduct = await this.purchaseProductRepository.findOne({
      where: { id: params.purchaseProductId },
    });

    if (!purchaseProduct) {
      throw new BadRequestException(
        PURCHASE_PRODUCT_ERROR.PURCHASE_PRODUCT_NOT_FOUND,
      );
    }

    request.purchaseProductId = params.purchaseProductId;

    return true;
  }
}
