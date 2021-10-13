import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { PurchaseEntity } from './purchase.entity';
import { PurchaseRepository } from './purchase.repository';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { PurchaseDto } from './dto/purchase.dto';
import { PurchaseProductDto } from './dto/purchase-product.dto';
import { PatternProductService } from '../pattern-product/pattern-product.service';
import { SewingProductService } from '../sewing-product/sewing-product.service';
import { MasterClassService } from '../master-class/master-class.service';
import { VerifyPurchaseProductsDto } from './dto/verify-purchase-products.dto';
import { PromoCodeService } from '../promo-code/promo-code.service';
import { PurchaseProductService } from '../purchase-product/purchase-product.service';
import { USER_VERIFICATION_ERROR } from '../user-verification/enum/user-verification-error.enum';
@Injectable()
export class PurchaseService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private promoCodeService: PromoCodeService,
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
      if (item.type === 2 || item.type === 1) {
        const result =
          await this.patternProductService.getPurchaseParamsPatternProduct(
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
        (item.totalPrice - item.totalPrice * (item.totalDiscount / 100)) *
          item.totalCount;
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
      purchaseProducts,
      userId,
      email,
    });
  }

  async save(
    body: CreatePurchaseDto,
    userId: number = undefined,
    email: string,
  ): Promise<PurchaseEntity> {
    const { verifiedPurchaseProducts, price }: VerifyPurchaseProductsDto =
      await this.VerifyPurchaseProducts(body.purchaseProducts);
    const promoCodeDiscount = await this.promoCodeService.checkFromServer(
      body.purchase.promoCode,
    );
    body.purchase.promoCodeDiscount = promoCodeDiscount;
    body.purchase.price = price;

    const purchase = await this.create(
      body.purchase,
      verifiedPurchaseProducts,
      userId,
      email,
    );
    const result = await this.purchaseRepository.save(purchase);
    this.purchaseRepository.update(result.id, {
      orderNumber: await PurchaseEntity.generateOrderNumber(result._NID),
    });
    return result;
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

  async getOneForUser(id: string, userId) {
    return await this.purchaseProductService.getOneProductForUser(id, userId);
  }

  async getOneMasterClass(id: string) {
    return await this.purchaseProductService.getOneMasterClass(id);
  }

  async update(id: any, body: any) {
    return await this.purchaseRepository.update(id, body);
  }

  async delete(id: string) {
    return await this.purchaseRepository.delete(id);
  }

  async confirmEmailForOrder(code: string): Promise<any> {
    const purchaseEmailConfirmationCode: string = await this.cacheManager.get(
      'purchaseEmailConfirmationCode',
    );

    if (purchaseEmailConfirmationCode === code) {
      this.cacheManager.del('purchaseEmailConfirmationCode');
      return true;
    } else {
      throw new BadRequestException(
        USER_VERIFICATION_ERROR.USER_VERIFICATION_EMAIL_CODE_DOESNT_EXISTS,
      );
    }
  }
}
