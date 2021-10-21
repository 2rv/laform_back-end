import {
  Injectable,
  BadRequestException,
  Inject,
  CACHE_MANAGER,
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
import { MasterClassEntity } from '../master-class/master-class.entity';
import { PatternProductEntity } from '../pattern-product/pattern-product.entity';
import { ProductOptionEntity } from '../product-option/product-option.entity';
import { SewingProductEntity } from '../sewing-product/sewing-product.entity';
import { DeliveryPriceService } from '../delivery-price/delivery-price.service';
import { PURCHASE_ERROR } from './enum/purchase.enum';
import { VerifyByCodeDto } from './dto/verify-by-code.dto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class PurchaseService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private promoCodeService: PromoCodeService,
    private deliveryPriceService: DeliveryPriceService,
    private purchaseRepository: PurchaseRepository,
    private purchaseProductService: PurchaseProductService,
    private patternProductService: PatternProductService,
    private sewingProductService: SewingProductService,
    private masterClassService: MasterClassService,
    private mailService: MailService,
  ) {}

  getPrice(price = 0, discount = 0, count = null, length = null): number {
    if (count) {
      return (price - price * (discount / 100)) * count;
    }
    if (length) {
      return (price - price * (discount / 100)) * length;
    }
    return (price - price * (discount / 100)) * 1;
  }
  async getMasterProduct(
    id: MasterClassEntity,
  ): Promise<{ totalDiscount: number; totalPrice: number; price: number }> {
    const result = await this.masterClassService.getPriceAndDiscount(id);
    return {
      totalDiscount: result.totalDiscount,
      totalPrice: result.totalPrice,
      price: this.getPrice(result.totalPrice, result.totalDiscount),
    };
  }
  async getElectronicPatternProduct(
    id: PatternProductEntity,
    option: ProductOptionEntity,
  ): Promise<{
    totalDiscount: number;
    totalPrice: number;
    price: number;
  }> {
    const result = await this.patternProductService.getPriceAndDiscount(
      id,
      option,
    );
    return {
      totalDiscount: result.totalDiscount,
      totalPrice: result.totalPrice,
      price: this.getPrice(result.totalPrice, result.totalDiscount),
    };
  }
  async getPrintPatternProduct(
    id: PatternProductEntity,
    option: ProductOptionEntity,
    count: number,
  ): Promise<{
    title: string;
    totalDiscount: number;
    totalPrice: number;
    totalCount: number;
    price: number;
  }> {
    const result = await this.patternProductService.getPriceAndDiscountAndCount(
      id,
      option,
    );
    return {
      title: result.title,
      totalDiscount: result.totalDiscount,
      totalPrice: result.totalPrice,
      price: this.getPrice(result.totalPrice, result.totalDiscount, count),
      totalCount: result.totalCount,
    };
  }
  async getSewingProduct(
    id: SewingProductEntity,
    option: ProductOptionEntity,
    count: number,
    length: number,
  ): Promise<{
    title: string;
    totalDiscount: number;
    totalPrice: number;
    totalCount: number;
    totalLength: number;
    price: number;
  }> {
    const result =
      await this.sewingProductService.getPriceAndDiscountAndCountAndLength(
        id,
        option,
      );
    return {
      title: result.title,
      totalDiscount: result.totalDiscount,
      totalPrice: result.totalPrice,
      price: this.getPrice(
        result.totalPrice,
        result.totalDiscount,
        count,
        length,
      ),
      totalCount: result.totalCount
        ? result.totalCount
        : result.totalLength
        ? undefined
        : 1,
      totalLength: result.totalLength
        ? result.totalLength
        : result.totalCount
        ? undefined
        : 1,
    };
  }

  async verifyUserByCodeAndEmail(body: VerifyByCodeDto) {
    const codeResult: string = await this.cacheManager.get(
      `AuthBasketEmailCodeFor${body.email}`,
    );

    if (codeResult === body.emailConfirmCode) {
      this.cacheManager.del(`AuthBasketEmailCodeFor${body.email}`);
      return true;
    } else {
      throw new BadRequestException(PURCHASE_ERROR.AUTH_CODE_IS_INCORRECT);
    }
  }
  async productUpdateData(purchaseProducts: any) {
    for (const item of purchaseProducts) {
      if (item.type === 2) {
        await this.patternProductService.updateCount(
          item.patternProductId,
          item.optionId,
          item.totalCount,
        );
      }
      if (item.type === 3) {
        await this.sewingProductService.updateCountOrLength(
          item.sewingProductId,
          item.optionId,
          item.totalCount,
          item.totalLength,
        );
      }
    }
  }

  async verifyProducts(
    purchaseProducts: PurchaseProductDto[],
  ): Promise<VerifyPurchaseProductsDto> {
    const totalResult = {
      products: [],
      price: 0,
    };

    for (const item of purchaseProducts) {
      if (item.type === 0) {
        const result = await this.getMasterProduct(item.masterClassId);
        const { totalDiscount, totalPrice, price } = result;
        item.totalDiscount = totalDiscount;
        item.totalPrice = totalPrice;
        item.totalCount = 1;
        totalResult.price += price;
        totalResult.products.push(item);
      }
      if (item.type === 1) {
        const result = await this.getElectronicPatternProduct(
          item.patternProductId,
          item.optionId,
        );
        const { totalDiscount, totalPrice, price } = result;
        item.totalDiscount = totalDiscount;
        item.totalPrice = totalPrice;
        item.totalCount = 1;
        totalResult.price += price;
        totalResult.products.push(item);
      }
      if (item.type === 2) {
        const result = await this.getPrintPatternProduct(
          item.patternProductId,
          item.optionId,
          item.totalCount,
        );
        const { totalDiscount, totalPrice, totalCount, price } = result;
        item.totalDiscount = totalDiscount;
        item.totalPrice = totalPrice;
        if (
          totalCount !== undefined &&
          Number(totalCount) < Number(item.totalCount)
        ) {
          throw new BadRequestException(
            `${result.title} - ${PURCHASE_ERROR.COUNT_GREATER_MAXIMUM} - ${totalCount}`,
          );
        }
        if (totalCount === undefined) item.totalCount = 1;
        totalResult.products.push(item);
        totalResult.price += price;
      }
      if (item.type === 3) {
        const result = await this.getSewingProduct(
          item.sewingProductId,
          item.optionId,
          item.totalCount,
          item.totalLength,
        );
        const { totalDiscount, totalPrice, totalCount, totalLength, price } =
          result;
        item.totalDiscount = totalDiscount;
        item.totalPrice = totalPrice;

        if (Boolean(totalCount) && item.totalCount > totalCount) {
          throw new BadRequestException(
            `${result.title} - ${PURCHASE_ERROR.COUNT_GREATER_MAXIMUM} - ${totalCount}`,
          );
        } else if (
          Boolean(totalLength) &&
          Math.ceil(item.totalLength * 100) > Math.ceil(totalLength * 100)
        ) {
          throw new BadRequestException(
            `${result.title} - ${PURCHASE_ERROR.LENGTH_GREATER_MAXIMUM} - ${totalLength}`,
          );
        } else {
          if (!Boolean(totalCount) && !Boolean(totalLength)) {
            item.totalCount = 1;
          }

          totalResult.products.push(item);
          totalResult.price += price;
        }
      }
    }

    return totalResult;
  }
  async verifyPromo(promoCode: string) {
    const result = await this.promoCodeService.checkFromServer(promoCode);
    return {
      promoCode: result?.promoCode,
      promoCodeDiscount: result?.discount,
    };
  }
  async verifyDiliveryMethod(diliveryId: string) {
    const result = await this.deliveryPriceService.getOneForPurchase(
      diliveryId,
    );
    return {
      diliveryName: result?.deliveryType,
      diliveryPrice: result?.deliveryTypePrice,
    };
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
    userId: number,
    email: string,
  ): Promise<PurchaseEntity> {
    const { products, price } = await this.verifyProducts(
      body.purchaseProducts,
    );
    const { promoCode, promoCodeDiscount } = await this.verifyPromo(
      body.purchase.promoCode,
    );
    const { diliveryName, diliveryPrice } = await this.verifyDiliveryMethod(
      body.purchase.typeOfDelivery,
    );

    body.purchase.promoCodeDiscount = promoCodeDiscount;
    body.purchase.promoCode = promoCode;
    body.purchase.price = Number(price.toFixed(2));
    body.purchase.typeOfDelivery = diliveryName;
    body.purchase.shippingPrice = diliveryPrice || 0;

    const purchase = await this.create(body.purchase, products, userId, email);
    const newOrder = await this.purchaseRepository.save(purchase);
    await this.productUpdateData(purchase.purchaseProducts);
    this.purchaseRepository.update(newOrder.id, {
      orderNumber: await PurchaseEntity.generateOrderNumber(newOrder._NID),
    });

    return newOrder;
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
    const result = await this.purchaseRepository.findOne({ id });
    if (result) {
      await this.mailService.sendInfoAboutOrderStatus(body);
      await this.purchaseRepository.update(id, body);
    } else {
      throw new BadRequestException(PURCHASE_ERROR.PURCHASE_NOT_FOUND);
    }
  }

  async delete(id: string) {
    return await this.purchaseRepository.delete(id);
  }
}
