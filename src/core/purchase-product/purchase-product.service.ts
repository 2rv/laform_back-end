import { Injectable } from '@nestjs/common';
import { PurchaseProductRepository } from './purchase-product.repository';

@Injectable()
export class PurchaseProductService {
  constructor(private purchaseProductRepository: PurchaseProductRepository) {}

  async getOneProductForUser(id: string, userId: number, orderStatus: number) {
    return await this.purchaseProductRepository.getOneProductForUser(
      id,
      userId,
      orderStatus,
    );
  }

  async getOnePaymentMasterClass(id: string, orderStatus: number) {
    const s = await this.purchaseProductRepository.getOnePaymentMasterClass(
      id,
      orderStatus,
    );
    if (!s) {
      return [];
    }
    return s;
  }

  async update(id: any, body: any) {
    return await this.purchaseProductRepository.update(id, body);
  }

  async delete(id: string) {
    return await this.purchaseProductRepository.delete(id);
  }
}
