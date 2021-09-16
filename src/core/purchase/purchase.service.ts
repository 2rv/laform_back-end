import { Injectable } from '@nestjs/common';

import { PurchaseEntity } from './purchase.entity';
import { PurchaseRepository } from './purchase.repository';
import { CreatePurchaseDto } from './dto/create-purchase.dto';

@Injectable()
export class PurchaseService {
  constructor(private purchaseRepository: PurchaseRepository) {}

  async create(body: any, userId, email): Promise<any> {
    return this.purchaseRepository.create({ ...body, userId, email });
  }

  async save(
    body: CreatePurchaseDto,
    userId: number,
    email: string,
  ): Promise<PurchaseEntity> {
    const purchase = await this.create(body.purchase, userId, email);
    purchase.purchaseProducts = body.purchaseProducts;
    return await this.purchaseRepository.save({
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
