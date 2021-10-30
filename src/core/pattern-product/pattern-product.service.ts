import { PatternProductRepository } from './pattern-product.repository';
import { PatternProductEntity } from './pattern-product.entity';
import { Injectable } from '@nestjs/common';
import { PatternProductDto } from './dto/pattern-product.dto';
import { ProductOptionEntity } from '../product-option/product-option.entity';
import { ProductOptionService } from '../product-option/product-option.service';
import { RecommendationService } from '../recommendation/recommendation.service';

@Injectable()
export class PatternProductService {
  constructor(
    private patternProductRepository: PatternProductRepository,
    private productOptionService: ProductOptionService,
    private recommendationService: RecommendationService,
  ) {}

  async create(body: PatternProductDto): Promise<PatternProductEntity> {
    body.options = body.options.map((item) => {
      item.vendorCode = PatternProductEntity.getVendorCode();
      return item;
    });
    if (body.optionType === 0) {
      body.vendorCode = PatternProductEntity.getVendorCode();
    }
    return await this.patternProductRepository.save(body);
  }

  async getAll(
    query: string,
    size: number,
    page: number,
    sort: string,
    by: string,
    where: string,
    type: string,
    category: string,
  ): Promise<[PatternProductEntity[], number]> {
    if (sort === 'title') {
      if (query === 'ru') {
        sort = 'pattern_product.titleRu';
      } else if (query === 'en') {
        sort = 'pattern_product.titleEn';
      }
    } else if (sort === 'date') {
      sort = 'pattern_product.createdDate';
      by = 'ASC';
    } else sort = '';
    if (type === 'printed') {
      type = '2';
    } else if (type === 'electronic') {
      type = '1';
    } else {
      type = '';
    }

    if (query === 'ru')
      return await this.patternProductRepository.findAllRu(
        size,
        page,
        sort,
        by,
        where,
        type,
        category,
      );
    if (query === 'en')
      return await this.patternProductRepository.findAllEn(
        size,
        page,
        sort,
        by,
        where,
        type,
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
    type: string,
    category: string,
    userId: number,
  ): Promise<[PatternProductEntity[], number]> {
    if (sort === 'title') {
      if (query === 'ru') {
        sort = 'pattern_product.titleRu';
      } else if (query === 'en') {
        sort = 'pattern_product.titleEn';
      }
    } else if (sort === 'date') {
      sort = 'pattern_product.createdDate';
      by = 'ASC';
    } else sort = '';
    if (type === 'printed') {
      type = '2';
    } else if (type === 'electronic') {
      type = '1';
    } else {
      type = '';
    }

    if (query === 'ru')
      return await this.patternProductRepository.findAllRuAuth(
        size,
        page,
        sort,
        by,
        where,
        type,
        category,
        userId,
      );
    if (query === 'en')
      return await this.patternProductRepository.findAllEnAuth(
        size,
        page,
        sort,
        by,
        where,
        type,
        category,
        userId,
      );
  }

  async getOne(id: string, query: string): Promise<PatternProductEntity> {
    if (query === 'ru')
      return await this.patternProductRepository.findOneRu(id);
    if (query === 'en')
      return await this.patternProductRepository.findOneEn(id);
  }
  async getOneAuth(
    id: string,
    query: string,
    userId: number,
  ): Promise<PatternProductEntity> {
    if (query === 'ru')
      return await this.patternProductRepository.findOneRuAuth(id, userId);

    if (query === 'en')
      return await this.patternProductRepository.findOneEnAuth(id, userId);
  }

  async getPinned(query: string): Promise<PatternProductEntity[]> {
    if (query === 'ru')
      return await this.patternProductRepository.findPinnedRu();
    if (query === 'en')
      return await this.patternProductRepository.findPinnedEn();
  }
  async getPinnedAuth(
    query: string,
    userId: number,
  ): Promise<PatternProductEntity[]> {
    if (query === 'ru')
      return await this.patternProductRepository.findPinnedRuAuth(userId);
    if (query === 'en')
      return await this.patternProductRepository.findPinnedEnAuth(userId);
  }

  async getLiked(
    userId: number,
    query: string,
    size: number,
    page: number,
  ): Promise<[PatternProductEntity[], number]> {
    if (query === 'ru')
      return await this.patternProductRepository.findLikedRu(
        userId,
        size,
        page,
      );
    if (query === 'en')
      return await this.patternProductRepository.findLikedEn(
        userId,
        size,
        page,
      );
  }

  async update(id: string, body: PatternProductDto) {
    body.options = body.options.map((item) => {
      if (!item.vendorCode) {
        item.vendorCode = PatternProductEntity.getVendorCode();
      }
      return item;
    });
    const patternProduct: PatternProductEntity =
      await this.patternProductRepository.findOneOrFail(id, {
        relations: ['recommendation'],
      });

    if (patternProduct.recommendation?.id) {
      await this.recommendationService.delete(patternProduct.recommendation.id);
    }
    Object.assign(patternProduct, { ...body });
    return await this.patternProductRepository.save(patternProduct);
  }

  async delete(id: string) {
    const patternProduct = await this.patternProductRepository.findOneOrFail(
      id,
    );
    return await this.patternProductRepository.delete(patternProduct.id);
  }

  async getPriceAndDiscount(
    patternProduct: PatternProductEntity,
    option: ProductOptionEntity,
  ): Promise<{
    totalPrice: number;
    totalDiscount: number;
  }> {
    const result = option
      ? await this.patternProductRepository.findOneAndOption(
          String(patternProduct),
          String(option),
        )
      : await this.patternProductRepository.findOne(patternProduct, {
          select: ['price', 'discount'],
        });
    return {
      totalPrice: result.price || result.options[0].price || 0,
      totalDiscount: result.discount || result.options[0].discount,
    };
  }

  async getPriceAndDiscountAndCount(
    patternProduct: PatternProductEntity,
    option: ProductOptionEntity,
  ): Promise<{
    title: string;
    totalPrice: number;
    totalDiscount: number;
    totalCount: number;
    isCount: boolean;
  }> {
    const result = option
      ? await this.patternProductRepository.findOneAndOption(
          String(patternProduct),
          String(option),
        )
      : await this.patternProductRepository.findOne(patternProduct, {
          select: [
            'price',
            'discount',
            'count',
            'titleEn',
            'titleRu',
            'isCount',
          ],
        });

    return {
      title: result.titleRu || result.titleEn,
      totalPrice: result.price || result.options?.[0].price || 0,
      totalDiscount: result.discount || result.options?.[0].discount,
      totalCount: result.count || result.options?.[0].count || 0,
      isCount: result.isCount,
    };
  }

  async updateCount(
    patternProduct: PatternProductEntity,
    option: ProductOptionEntity,
    count: number = 0,
  ) {
    if (option) {
      const result = await this.patternProductRepository.findOneAndOption(
        String(patternProduct),
        String(option),
      );

      if (!Boolean(result.options.length)) return;
      if (result.isCount && Number(result.options[0].count) >= Number(count)) {
        const newCount = Number(result.options[0].count) - Number(count);
        await this.productOptionService.update(result.options[0].id, {
          count: newCount,
        });
      }
    } else {
      const result = await this.patternProductRepository.findOneOrFail(
        patternProduct,
        {
          select: ['id', 'count', 'isCount'],
        },
      );
      if (!Boolean(result)) return;
      if (result.isCount && Number(result.count) >= Number(count)) {
        const newCount = Number(result.count) - Number(count);
        await this.patternProductRepository.update(result.id, {
          count: newCount,
        });
      }
    }
  }

  async getOneForUpdate(
    id: string,
    query: string,
  ): Promise<PatternProductEntity> {
    if (query === 'ru')
      return await this.patternProductRepository.findOneForUpdate(id);
  }
}
