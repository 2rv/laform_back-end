import { PurchaseProductEntity } from './../purchase-product/purchase-product.entity';
import { Injectable } from '@nestjs/common';

import { BasketEntity } from './basket.entity';
import { BasketRepository } from './basket.repository';
import { PurchaseProductRepository } from './../purchase-product/purchase-product.repository';
import { PurchaseProductDto } from '../purchase/dto/purchase-product.dto';
import { GetPurchaseProduct } from '../purchase/dto/get-purchase-product.dto';

@Injectable()
export class BasketService {
  constructor(
    private basketRepository: BasketRepository,
    private purchaseProductRepository: PurchaseProductRepository,
  ) {}

  async create(user) {
    await this.basketRepository.save({ userId: user.id });
  }

  async createProduct(
    userId: number,
    body: PurchaseProductDto,
  ): Promise<PurchaseProductEntity> {
    console.log(userId);
    const basketId = await this.basketRepository.findOne({
      where: {
        userId: userId,
      },
    });
    console.log(basketId);
    return await this.purchaseProductRepository.save({
      ...body,
      basketId,
    });
  }

  async findOne(userId: number): Promise<GetPurchaseProduct> {
    const basket = await this.basketRepository.getOne(userId);
    const countOfProducts = await this.countOfProducts(basket.id);
    return await { countOfProducts, basket };
  }

  async updateProduct(
    id: string,
    body: PurchaseProductDto,
    userId: number,
  ): Promise<GetPurchaseProduct> {
    await this.purchaseProductRepository.update(id, body);
    return await this.findOne(userId);
  }

  async deleteProduct(id: string, userId: number) {
    await this.purchaseProductRepository.delete(id);
    return await this.findOne(userId);
  }

  async countOfProducts(basketId: string) {
    return await this.purchaseProductRepository.count({
      where: {
        basketId: basketId,
      },
    });
  }
}
