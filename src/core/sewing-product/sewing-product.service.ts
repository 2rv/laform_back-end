import { SewingProductRepository } from './sewing-product.repository';
import { SewingProductEntity } from './sewing-product.entity';
import { Injectable } from '@nestjs/common';
import { SewingProductDto } from './dto/sewing-product.dto';
import { ProductOptionEntity } from '../product-option/product-option.entity';
import { ProductOptionService } from '../product-option/product-option.service';

@Injectable()
export class SewingProductService {
  constructor(
    private sewingProductRepository: SewingProductRepository,
    private productOptionService: ProductOptionService,
  ) {}

  async create(body: SewingProductDto): Promise<SewingProductEntity> {
    body.options = body.options.map((item) => {
      item.vendorCode = SewingProductEntity.getVendorCode();
      return item;
    });
    if (body.optionType === 0) {
      body.vendorCode = SewingProductEntity.getVendorCode();
    }
    return await this.sewingProductRepository.save(body);
  }

  async getAll(
    query: string,
    size: number,
    page: number,
    sort: string,
    by: string,
    where: string,
  ): Promise<SewingProductEntity[]> {
    if (sort === 'title') {
      if (query === 'ru') {
        sort = 'sewing_product.titleRu';
      } else if (query === 'en') {
        sort = 'sewing_product.titleEn';
      }
    } else sort = '';

    if (query === 'ru')
      return await this.sewingProductRepository.findAllRu(
        size,
        page,
        sort,
        by,
        where,
      );
    if (query === 'en')
      return await this.sewingProductRepository.findAllEn(
        size,
        page,
        sort,
        by,
        where,
      );
  }
  async getAllAuth(
    query: string,
    size: number,
    page: number,
    sort: string,
    by: string,
    where: string,
    userId: number,
  ): Promise<SewingProductEntity[]> {
    if (sort === 'title') {
      if (query === 'ru') {
        sort = 'sewing_product.titleRu';
      } else if (query === 'en') {
        sort = 'sewing_product.titleEn';
      }
    } else sort = '';

    if (query === 'ru')
      return await this.sewingProductRepository.findAllRuAuth(
        size,
        page,
        sort,
        by,
        where,
        userId,
      );
    if (query === 'en')
      return await this.sewingProductRepository.findAllEnAuth(
        size,
        page,
        sort,
        by,
        where,
        userId,
      );
  }

  async getOne(id: string, query: string): Promise<SewingProductEntity> {
    if (query === 'ru') return await this.sewingProductRepository.findOneRu(id);
    if (query === 'en') return await this.sewingProductRepository.findOneEn(id);
  }
  async getOneAuth(
    id: string,
    query: string,
    userId: number,
  ): Promise<SewingProductEntity> {
    if (query === 'ru')
      return await this.sewingProductRepository.findOneRuAuth(id, userId);
    if (query === 'en')
      return await this.sewingProductRepository.findOneEnAuth(id, userId);
  }

  async getPinned(query: string): Promise<SewingProductEntity[]> {
    if (query === 'ru')
      return await this.sewingProductRepository.findPinnedRu();
    if (query === 'en')
      return await this.sewingProductRepository.findPinnedEn();
  }
  async getPinnedAuth(
    query: string,
    userId: number,
  ): Promise<SewingProductEntity[]> {
    if (query === 'ru')
      return await this.sewingProductRepository.findPinnedRuAuth(userId);
    if (query === 'en')
      return await this.sewingProductRepository.findPinnedEnAuth(userId);
  }

  async getLiked(
    userId: number,
    query: string,
  ): Promise<SewingProductEntity[]> {
    if (query === 'ru')
      return await this.sewingProductRepository.findLikedRu(userId);
    if (query === 'en')
      return await this.sewingProductRepository.findLikedEn(userId);
  }

  async update(id: string, body: SewingProductDto) {
    const sewingProduct = await this.sewingProductRepository.findOneOrFail(id);
    return await this.sewingProductRepository.update(sewingProduct.id, body);
  }
  async delete(id: string) {
    const sewingProduct = await this.sewingProductRepository.findOneOrFail(id);
    return await this.sewingProductRepository.delete(sewingProduct.id);
  }
  async getPriceAndDiscountAndCountAndLength(
    sewingProduct: SewingProductEntity,
    option: ProductOptionEntity,
  ): Promise<{
    title: string;
    totalPrice: number;
    totalDiscount: number;
    totalCount: number;
    totalLength: number;
  }> {
    const result = option
      ? await this.sewingProductRepository.findOneAndOption(
          String(sewingProduct),
          String(option),
        )
      : await this.sewingProductRepository.findOne(sewingProduct, {
          select: [
            'price',
            'discount',
            'count',
            'length',
            'titleRu',
            'titleEn',
          ],
        });
    return {
      title: result.titleRu || result.titleEn,
      totalPrice: result.price || result.options?.[0].price,
      totalDiscount: result.discount || result.options?.[0].discount,
      totalCount: result.count || result.options?.[0].count,
      totalLength: result.length || result.options?.[0].length,
    };
  }

  async updateCountOrLength(
    sewingProduct: SewingProductEntity,
    option: ProductOptionEntity,
    count?: number,
    length?: number,
  ) {
    if (option) {
      const result = await this.sewingProductRepository.findOneAndOption(
        String(sewingProduct),
        String(option),
      );
      if (!Boolean(result.options.length)) return;

      if (
        Boolean(result.options[0].count) &&
        count &&
        Number(result.options[0].count) >= Number(count)
      ) {
        const newCount = result.options[0].count - Number(count);
        await this.productOptionService.update(result.options[0].id, {
          count: newCount,
        });
      }

      if (
        Boolean(result.options[0].length) &&
        length &&
        Number(result.options[0].length) >= Number(length)
      ) {
        const newLength = result.options[0].length - Number(length);
        await this.productOptionService.update(result.options[0].id, {
          length: newLength,
        });
      }
    } else {
      const result = await this.sewingProductRepository.findOneOrFail(
        sewingProduct,
        {
          select: ['id', 'count', 'length'],
        },
      );
      if (!Boolean(result)) return;
      if (
        Boolean(result.count) &&
        count &&
        Number(result.count) >= Number(count)
      ) {
        const newCount = result.count - Number(count);
        await this.sewingProductRepository.update(result.id, {
          count: newCount,
        });
      }

      if (
        Boolean(result.length) &&
        length &&
        Number(result.length) >= Number(length)
      ) {
        const newLength = result.length - Number(length);
        await this.sewingProductRepository.update(result.id, {
          length: newLength,
        });
      }
    }
  }
}
