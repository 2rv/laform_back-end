import { Injectable } from '@nestjs/common';
import { PurchaseEntity } from './purchase.entity';
import { PurchaseRepository } from './purchase.repository';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { PurchaseDto } from './dto/purchase.dto';
import { PurchaseProductDto } from './dto/purchase-product.dto';
import { PatternProductService } from '../pattern-product/pattern-product.service';
import { SewingProductService } from '../sewing-product/sewing-product.service';
import { MasterClassService } from '../master-class/master-class.service';
import { VerifyPurchaseProductsDto } from './dto/verify-purchase-products.dto';
import { PurchaseProductService } from '../purchase-product/purchase-product.service';

@Injectable()
export class PurchaseService {
  constructor(
    private purchaseRepository: PurchaseRepository,
    private purchaseProductService: PurchaseProductService,
    private patternProductService: PatternProductService,
    private sewingProductService: SewingProductService,
    private masterClassService: MasterClassService,
  ) {}

  async VerifyPurchaseProducts(
    purchaseProducts: PurchaseProductDto[],
  ): Promise<VerifyPurchaseProductsDto> {
    const verifyResult = {
      verifiedPurchaseProducts: [],
      price: 0,
    };

    for (const item of purchaseProducts) {
      if (item.type === 0) {
        const result = await this.masterClassService.getPurchaseParams(
          item.masterClassId,
          item.program,
        );
        item.totalDiscount = result.totalDiscount;
        item.totalPrice = result.totalPrice;
      }
      if (item.type === 1) {
        const result =
          await this.patternProductService.getPurchaseParamsElectronic(
            item.patternProductId,
          );
        item.totalDiscount = result.totalDiscount;
        item.totalPrice = result.totalPrice;
      }
      if (item.type === 2) {
        const result = await this.patternProductService.getPurchaseParamsPrint(
          item.patternProductId,
          item.size,
        );
        item.totalDiscount = result.totalDiscount;
        item.totalPrice = result.totalPrice;
      }
      if (item.type === 3) {
        const result = await this.sewingProductService.getPurchaseParams(
          item.sewingProductId,
          item.size,
        );
        item.totalDiscount = result.totalDiscount;
        item.totalPrice = result.totalPrice;
      }
      verifyResult.price =
        verifyResult.price +
        (item.totalPrice - item.totalPrice * (item.totalDiscount / 100));
      verifyResult.verifiedPurchaseProducts.push(item);
    }

    return verifyResult;
  }

  async create(
    purchase: PurchaseDto,
    purchaseProducts: PurchaseProductDto[],
    userId,
    email: string,
  ): Promise<PurchaseEntity> {
    return this.purchaseRepository.create({
      ...purchase,
      userId,
      email,
    });
  }

  async save(
    body: CreatePurchaseDto,
    userId: number = undefined,
    email: string,
  ): Promise<any | PurchaseEntity> {
    const { verifiedPurchaseProducts, price }: VerifyPurchaseProductsDto =
      await this.VerifyPurchaseProducts(body.purchaseProducts);

    body.purchase.price = price;

    const purchase = await this.create(
      body.purchase,
      verifiedPurchaseProducts,
      userId,
      email,
    );
    const purchaseProducts = await this.purchaseProductService.createMany(
      verifiedPurchaseProducts,
    );
    // return await this.purchaseRepository.save({ ...purchase });
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
