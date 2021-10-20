import { SewingProductRepository } from './sewing-product.repository';
import { SewingProductEntity } from './sewing-product.entity';
import { Injectable } from '@nestjs/common';
import { SewingProductDto } from './dto/sewing-product.dto';
import { ProductOptionEntity } from '../product-option/product-option.entity';

@Injectable()
export class SewingProductService {
  constructor(private sewingProductRepository: SewingProductRepository) {}

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
    category: string,
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
        category,
      );
    if (query === 'en')
      return await this.sewingProductRepository.findAllEn(
        size,
        page,
        sort,
        by,
        where,
        category,
      );
  }
  async getAllAuth(
    query: string,
    size: number,
    page: number,
    sort: string,
    by: string,
    where: string,
    category: string,
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
        category,
        userId,
      );
    if (query === 'en')
      return await this.sewingProductRepository.findAllEnAuth(
        size,
        page,
        sort,
        by,
        where,
        category,
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
          select: ['price', 'discount', 'count', 'length'],
        });
    return {
      totalPrice: result.price || result.options?.[0].price,
      totalDiscount: result.discount || result.options?.[0].discount,
      totalCount: result.count || result.options?.[0].count,
      totalLength: result.length || result.options?.[0].length,
    };
  }
}
