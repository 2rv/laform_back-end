import { PurchaseProductService } from './../purchase-product/purchase-product.service';
import { PurchaseEntity } from './purchase.entity';
import { Injectable } from '@nestjs/common';
import { PurchaseRepository } from './purchase.repository';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class PurchaseService {
  constructor(
    private purchaseRepository: PurchaseRepository,
    private purchaseProductService: PurchaseProductService,
  ) {}

  async create(body, email: string, userId: number): Promise<any> {
    return this.purchaseRepository.create({ ...body, email, userId });
  }

  async createForNotRegUser(body): Promise<any> {
    return this.purchaseRepository.create(body);
  }

  async save(
    body: CreatePurchaseDto,
    email: string,
    userId: number,
  ): Promise<PurchaseEntity> {
    const purchase = await this.create(body.purchase, email, userId);
    purchase.purchaseProducts = body.purchaseProducts;
    const result = await this.purchaseRepository.save({
      ...purchase,
    });
    if (result) {
      for (let purchaseProduct of purchase.purchaseProducts) {
        await this.purchaseProductService.update(purchaseProduct.id, {
          basketId: null,
        });
      }
    }
    return result;
  }

  async saveForNotRegUser(body: CreatePurchaseDto): Promise<PurchaseEntity> {
    const purchase = await this.createForNotRegUser(body.purchase);
    purchase.purchaseProducts = body.purchaseProducts;
    return await await this.purchaseRepository.save({
      ...purchase,
    });
  }

  async getAll(size: number, page: number): Promise<PurchaseEntity[]> {
    return await this.purchaseRepository.getAll(size, page);
  }

  async getAllForUser(
    size: number,
    page: number,
    userId,
  ): Promise<PurchaseEntity[]> {
    return await this.purchaseRepository.getAllForUser(size, page, userId);
  }

  async getOne(id: string): Promise<PurchaseEntity> {
    return await this.purchaseRepository.getOne(id);
  }

  async getOneForUser(id: string, userId): Promise<PurchaseEntity> {
    return await this.purchaseRepository.getOneForUser(id, userId);
  }

  async update(id: any, body: any) {
    return await this.purchaseRepository.update(id, body);
  }

  async delete(id: string) {
    return await this.purchaseRepository.delete(id);
  }
}
