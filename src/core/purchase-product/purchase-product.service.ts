import { Injectable } from '@nestjs/common';
import { PurchaseProductRepository } from './purchase-product.repository';

@Injectable()
export class PurchaseProductService {
  constructor(private purchaseProductRepository: PurchaseProductRepository) {}

  async getOneProductForUser(id: string, userId: number) {
    return await this.purchaseProductRepository.getOneProductForUser(
      id,
      userId,
    );
  }

  async getOneMasterClass(id: string) {
    return await this.purchaseProductRepository.getOneMasterClass(id);
  }

  async getOnePaymentMasterClass(id: string) {
    const s = await this.purchaseProductRepository.getOnePaymentMasterClass(id);
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
