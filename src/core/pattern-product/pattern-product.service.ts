import { FileUploadService } from '../file-upload/file-upload.service';
import { PatternProductRepository } from './pattern-product.repository';
import { UpdatePatternProductDto } from './dto/update-pattern-product.dto';
import { PatternProductEntity } from './pattern-product.entity';
import { Injectable } from '@nestjs/common';
import { PatternProductDto } from './dto/pattern-product.dto';
import { SizesService } from '../sizes/sizes.service';

@Injectable()
export class PatternProductService {
  constructor(
    private patternProductRepository: PatternProductRepository,
    private fileUploadService: FileUploadService,
    private sizesService: SizesService,
  ) {}

  async create(body: PatternProductDto): Promise<PatternProductEntity> {
    await this.sizesService.createMany(body.sizes);
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
  ): Promise<PatternProductEntity[]> {
    if (sort === 'title') {
      if (query === 'ru') {
        sort = 'pattern_product.titleRu';
      } else if (query === 'en') {
        sort = 'pattern_product.titleEn';
      }
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
      );
    if (query === 'en')
      return await this.patternProductRepository.findAllEn(
        size,
        page,
        sort,
        by,
        where,
        type,
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
    userId: number,
  ): Promise<PatternProductEntity[]> {
    if (sort === 'title') {
      if (query === 'ru') {
        sort = 'pattern_product.titleRu';
      } else if (query === 'en') {
        sort = 'pattern_product.titleEn';
      }
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
  ): Promise<PatternProductEntity[]> {
    if (query === 'ru')
      return await this.patternProductRepository.findLikedRu(userId);
    if (query === 'en')
      return await this.patternProductRepository.findLikedEn(userId);
  }

  async delete(id: string) {
    const patternProduct = await this.patternProductRepository.findOneOrFail(
      id,
    );
    await this.fileUploadService.deletePatternProduct(patternProduct.id);
    return await this.patternProductRepository.delete(patternProduct.id);
  }

  async update(id: string, body: UpdatePatternProductDto) {
    if (body.images) {
      for (const file of body.images) {
        await this.fileUploadService.update(file, { patternProductId: id });
      }
    }
    return await this.patternProductRepository.update(id, body.patternProduct);
  }

  async getDiscount(id): Promise<number> {
    return await (
      await this.patternProductRepository.findOne(id)
    ).discount;
  }

  async getPurchaseParamsPatternProduct(
    patternProductId,
    sizeId,
  ): Promise<any> {
    const discount = await (
      await this.patternProductRepository.findOne(patternProductId)
    ).discount;
    const price = await this.sizesService.getSizePrice(sizeId);
    return {
      totalPrice: price,
      totalDiscount: discount,
    };
  }
}
