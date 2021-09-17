import { Injectable } from '@nestjs/common';

import { PurchaseEntity } from './purchase.entity';
import { PurchaseRepository } from './purchase.repository';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { PurchaseDto } from './dto/purchase.dto';
import { ProgramsService } from '../programs/programs.service';
import { SizesService } from '../sizes/sizes.service';
import { PurchaseProductDto } from './dto/purchase-product.dto';
import { PatternProductService } from '../pattern-product/pattern-product.service';
import { SewingProductService } from '../sewing-product/sewing-product.service';
import { MasterClassService } from '../master-class/master-class.service';
import { PurchaseProductEntity } from '../purchase-product/purchase-product.entity';

@Injectable()
export class PurchaseService {
  constructor(
    private purchaseRepository: PurchaseRepository,
    private programsService: ProgramsService,
    private sizesService: SizesService,
    private patternProductService: PatternProductService,
    private sewingProductService: SewingProductService,
    private masterClassService: MasterClassService,
  ) {}

  async create(
    body: PurchaseDto,
    purchaseProducts: PurchaseProductDto[],
    userId,
    email: string,
  ): Promise<PurchaseEntity> {
    console.log(purchaseProducts);
    return this.purchaseRepository.create({
      ...body,
      purchaseProducts,
      userId,
      email,
    });
  }

  async save(
    body: CreatePurchaseDto,
    userId: number = null,
    email: string,
  ): Promise<PurchaseEntity> {
    const verifyPurchaseProducts: PurchaseProductDto[] =
      body.purchaseProducts.map((item: PurchaseProductDto) => {
        if (item.type === 0) {
          item.totalDiscount = this.masterClassService.getDiscount(
            item.masterClassId,
          );
          item.totalPrice = this.programsService.getProgramPrice(item.program);
        }
        if (item.type === 1) {
          item.totalDiscount = this.patternProductService.getDiscount(
            item.patternProductId,
          );
          item.totalPrice = this.patternProductService.getPrice(
            item.patternProductId,
          );
        }
        if (item.type === 2) {
          item.totalDiscount = this.patternProductService.getDiscount(
            item.patternProductId,
          );
          item.totalPrice = this.sizesService.getSizePrice(item.size);
        }
        if (item.type === 3) {
          item.totalDiscount = this.sewingProductService.getDiscount(
            item.sewingProductId,
          );
          item.totalPrice = this.sizesService.getSizePrice(item.size);
        }

        return item;
      });
    const purchase = await this.create(
      body.purchase,
      verifyPurchaseProducts,
      userId,
      email,
    );
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
