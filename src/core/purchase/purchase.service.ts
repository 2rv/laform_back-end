import {
  Injectable,
  BadRequestException,
  Inject,
  CACHE_MANAGER,
  InternalServerErrorException,
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
import { PURCHASE_STATUS } from './enum/purchase.status';
import { UpdatePurchaseStatusDto } from './dto/update-purchase-status.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { UserRepository } from '../user/user.repository';
import { UserEntity } from '../user/user.entity';
import { generateVendorCode } from 'src/common/utils/vendor-coder';
import { UserInfoService } from '../user-info/user-info.service';

interface ProductParamsInfoType {
  title?: string;
  discount: number;
  price: number;
  totalPrice: number;
  isCount?: boolean;
  totalCount?: number;
  isLength?: boolean;
  totalLength?: number;
}
interface getPriceProps {
  price: number;
  discount: number;
  isCount: boolean;
  count: number;
  isLength: boolean;
  length: number;
}

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
    private userInfoService: UserInfoService,
    private userRepository: UserRepository,
  ) {}

  getPrice(props: getPriceProps): number {
    const {
      price = 0,
      discount = 0,
      isCount = false,
      count = 0,
      isLength = false,
      length = 0,
    } = props;
    if (isCount) {
      return (price - price * (discount / 100)) * count;
    } else if (isLength) {
      return (price - price * (discount / 100)) * length;
    } else {
      return (price - price * (discount / 100)) * 1;
    }
  }

  async getMasterProduct(
    id: MasterClassEntity,
  ): Promise<ProductParamsInfoType> {
    const result = await this.masterClassService.getPriceAndDiscount(id);
    return {
      discount: result.totalDiscount,
      price: result.totalPrice,
      totalPrice: this.getPrice({
        price: result.totalPrice,
        discount: result.totalDiscount,
        isCount: false,
        count: 1,
        isLength: false,
        length: 0,
      }),
    };
  }
  async getElectronicPatternProduct(
    id: PatternProductEntity,
    option: ProductOptionEntity,
  ): Promise<ProductParamsInfoType> {
    const result = await this.patternProductService.getPriceAndDiscount(
      id,
      option,
    );
    return {
      discount: result.totalDiscount,
      price: result.totalPrice,
      totalPrice: this.getPrice({
        price: result.totalPrice,
        discount: result.totalDiscount,
        isCount: false,
        count: 1,
        isLength: false,
        length: 0,
      }),
    };
  }
  async getPrintPatternProduct(
    id: PatternProductEntity,
    option: ProductOptionEntity,
    count: number,
  ): Promise<ProductParamsInfoType> {
    const result = await this.patternProductService.getPriceAndDiscountAndCount(
      id,
      option,
    );
    return {
      title: result.title,
      discount: result.totalDiscount,
      price: result.totalPrice,
      totalPrice: this.getPrice({
        price: result.totalPrice,
        discount: result.totalDiscount,
        isCount: result.isCount,
        count: count,
        isLength: false,
        length: 0,
      }),
      isCount: result.isCount,
      totalCount: result.totalCount,
    };
  }
  async getSewingProduct(
    id: SewingProductEntity,
    option: ProductOptionEntity,
    count: number,
    length: number,
  ): Promise<ProductParamsInfoType> {
    const result =
      await this.sewingProductService.getPriceAndDiscountAndCountAndLength(
        id,
        option,
      );
    return {
      title: result.title,
      discount: result.totalDiscount,
      price: result.totalPrice,
      totalPrice: this.getPrice({
        price: result.totalPrice,
        discount: result.totalDiscount,
        isCount: result.isCount,
        count: count,
        isLength: result.isLength,
        length: length,
      }),
      isCount: result.isCount,
      totalCount: result.totalCount,
      isLength: result.isLength,
      totalLength: result.totalLength,
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
        const { discount, price, totalPrice } = result;
        item.totalDiscount = discount;
        item.totalPrice = price;
        item.totalCount = 1;
        totalResult.price = totalResult.price + totalPrice;
        totalResult.products.push(item);
      }
      if (item.type === 1) {
        const result = await this.getElectronicPatternProduct(
          item.patternProductId,
          item.optionId,
        );
        const { discount, price, totalPrice } = result;
        item.totalDiscount = discount;
        item.totalPrice = price;
        item.totalCount = 1;
        totalResult.price = totalResult.price + totalPrice;
        totalResult.products.push(item);
      }
      if (item.type === 2) {
        const result = await this.getPrintPatternProduct(
          item.patternProductId,
          item.optionId,
          item.totalCount,
        );
        const { title, discount, price, totalPrice, isCount, totalCount } =
          result;
        item.totalDiscount = discount;
        item.totalPrice = price;
        if (isCount && item.totalCount < 1) {
          throw new BadRequestException(
            `${title} - ${PURCHASE_ERROR.MINIMUM_COUNT_IS} - 1`,
          );
        }
        if (isCount && Number(totalCount) < Number(item.totalCount)) {
          throw new BadRequestException(
            `${title} - ${PURCHASE_ERROR.COUNT_GREATER_MAXIMUM} - ${totalCount}`,
          );
        }
        if (!isCount) item.totalCount = 1;
        totalResult.products.push(item);
        totalResult.price = totalResult.price + totalPrice;
      }
      if (item.type === 3) {
        const result = await this.getSewingProduct(
          item.sewingProductId,
          item.optionId,
          item.totalCount,
          item.totalLength,
        );
        const {
          title,
          discount,
          price,
          totalPrice,
          isCount,
          totalCount,
          isLength,
          totalLength,
        } = result;

        item.totalDiscount = discount;
        item.totalPrice = price;

        if (isCount && item.totalCount < 1) {
          throw new BadRequestException(
            `${title} - ${PURCHASE_ERROR.MINIMUM_COUNT_IS} - 1`,
          );
        }
        if (isLength && Number(item.totalLength) < 0.1) {
          throw new BadRequestException(
            `${title} - ${PURCHASE_ERROR.MINIMUM_LENGTH_IS} - 0.1`,
          );
        }
        if (isCount && Number(item.totalCount) > Number(totalCount)) {
          throw new BadRequestException(
            `${title} - ${PURCHASE_ERROR.COUNT_GREATER_MAXIMUM} - ${totalCount}`,
          );
        }
        if (
          isLength &&
          Math.ceil(Number(item.totalLength) * 100) >
            Math.ceil(Number(totalLength) * 100)
        ) {
          throw new BadRequestException(
            `${title} - ${PURCHASE_ERROR.LENGTH_GREATER_MAXIMUM} - ${totalLength}`,
          );
        }
        if (!isCount && !isLength) item.totalCount = 1;
        totalResult.products.push(item);
        totalResult.price = totalResult.price + totalPrice;
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
    auth: boolean,
  ): Promise<any> {
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

    let result;
    let notAuthUserId: number;
    const findUser: UserEntity = await this.userRepository.findOne({ email });
    if (Boolean(findUser) === true && auth === false) {
      result = { userExist: true };
      notAuthUserId = findUser.id;
    } else if (Boolean(findUser) === false) {
      const user = await this.createUserAfterPurchase(email);
      notAuthUserId = user.id;
    }

    const purchase = await this.create(
      body.purchase,
      products,
      auth ? userId : notAuthUserId,
      email,
    );
    const newPurchase = await this.purchaseRepository.save(purchase);
    await this.productUpdateData(purchase.purchaseProducts);
    await this.purchaseRepository.update(newPurchase.id, {
      orderNumber: await PurchaseEntity.generateOrderNumber(newPurchase._NID),
    });
    await this.purchaseAwaitingPayment(newPurchase.id);

    return result;
  }

  async createUserAfterPurchase(email: string): Promise<UserEntity> {
    const user: UserEntity = new UserEntity();
    const password = generateVendorCode();
    const login = email.split('@')[0];
    user.login = login;
    user.email = email;
    user.emailConfirmed = true;
    user.password = await UserEntity.hashPassword(password);

    try {
      await user.save();
      await this.userInfoService.create(user);
      await this.mailService.sendPasswordForNewCreatedUserAfterPurchase({
        email,
        password,
        login,
      });

      return user;
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async purchaseAwaitingPayment(purchaseId: string) {
    await this.purchaseRepository.update(purchaseId, {
      orderStatus: PURCHASE_STATUS.AWAITING_PAYMENT,
    });
    await this.sendPurchaseInfo(purchaseId);
  }

  async purchasePaid(purchaseId: string) {
    await this.purchaseRepository.update(purchaseId, {
      orderStatus: PURCHASE_STATUS.PAID,
    });
    await this.sendPurchaseInfo(purchaseId);
  }

  async purchaseAwaitinSend(purchaseId: string) {
    await this.purchaseRepository.update(purchaseId, {
      orderStatus: PURCHASE_STATUS.AWAITING_SEND,
    });
    await this.sendPurchaseInfo(purchaseId);
  }

  async purchaseSent(purchaseId: string) {
    await this.purchaseRepository.update(purchaseId, {
      orderStatus: PURCHASE_STATUS.SENT,
    });
    await this.sendPurchaseInfo(purchaseId);
  }

  async sendPurchaseInfo(purchaseId) {
    const purchase = await this.purchaseRepository.getAllForEmail(purchaseId);
    await this.mailService.sendPurchaseInfo(purchase.email, purchase);
  }
  async sendUpdatedPurchaseInfo(purchaseId) {
    const purchase = await this.purchaseRepository.getAllForEmail(purchaseId);
    await this.mailService.sendUpdatedPurchaseInfo(purchase.email, purchase);
  }

  async getAll(
    size: number,
    page: number,
  ): Promise<[PurchaseEntity[], number]> {
    return await this.purchaseRepository.getAll(size, page);
  }
  async getAllForUser(
    size: number,
    page: number,
    userId,
  ): Promise<[PurchaseEntity[], number]> {
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

  async updatePurchaseStatus(id: any, body: UpdatePurchaseStatusDto) {
    const result = await this.purchaseRepository.findOne({ id });

    if (!result) {
      throw new BadRequestException(PURCHASE_ERROR.PURCHASE_NOT_FOUND);
    }

    await this.purchaseRepository.update(result.id, {
      orderStatus: body.orderStatus,
    });
    await this.sendUpdatedPurchaseInfo(result.id);
  }

  async update(id: any, body: UpdatePurchaseDto) {
    const result = await this.purchaseRepository.findOneOrFail({ id });
    if (!result) {
      throw new BadRequestException(PURCHASE_ERROR.PURCHASE_NOT_FOUND);
    }
    const { products, price } = await this.verifyProducts(
      body.purchaseProducts,
    );
    result.orderStatus = body.orderStatus;
    result.email = body.email;
    result.fullName = body.fullName;
    result.city = body.city;
    result.phoneNumber = body.phoneNumber;
    result.comment = body.comment;
    result.typeOfDelivery = body.typeOfDelivery;
    result.price = price;
    //@ts-ignore
    result.purchaseProducts = products;
    return await this.purchaseRepository.save(result);
  }

  async delete(id: string) {
    return await this.purchaseRepository.delete(id);
  }
}
