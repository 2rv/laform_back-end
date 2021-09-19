import { Injectable } from '@nestjs/common';
import { PurchaseProductDto } from '../purchase/dto/purchase-product.dto';
import { PurchaseEntity } from '../purchase/purchase.entity';
import { PurchaseProductRepository } from './purchase-product.repository';

@Injectable()
export class PurchaseProductService {
  constructor(private purchaseProductRepository: PurchaseProductRepository) {}

  async createMany(purchaseProducts: PurchaseProductDto[]) {
    for (const item of purchaseProducts) {
      await this.purchaseProductRepository.save(item);
    }
    return;
  }

  async update(id: any, body: any) {
    return await this.purchaseProductRepository.update(id, body);
  }

  async delete(id: string) {
    return await this.purchaseProductRepository.delete(id);
  }
}
