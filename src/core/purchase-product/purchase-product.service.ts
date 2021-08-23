import { Injectable } from '@nestjs/common';
import { PurchaseProductRepository } from './purchase-product.repository';

@Injectable()
export class PurchaseProductService {
  constructor(private purchaseProductRepository: PurchaseProductRepository) {}

  create(body: any): any {
    return this.purchaseProductRepository.create(body);
  }

  async update(id: any, body: any) {
    return await this.purchaseProductRepository.update(id, body);
  }

  async delete(id: string) {
    return await this.purchaseProductRepository.delete(id);
  }
}
