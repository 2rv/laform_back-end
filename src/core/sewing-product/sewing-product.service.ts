import { FileUploadService } from '../file-upload/file-upload.service';
import { SewingProductRepository } from './sewing-product.repository';
import { UpdateSewingProductDto } from './dto/update-sewing-product.dto';
import { SewingProductEntity } from './sewing-product.entity';
import { Injectable } from '@nestjs/common';
import { SewingProductDto } from './dto/sewing-product.dto';
import { SizesService } from '../sizes/sizes.service';

@Injectable()
export class SewingProductService {
  constructor(
    private sewingProductRepository: SewingProductRepository,
    private fileUploadService: FileUploadService,
    private sizesService: SizesService,
  ) {}

  async create(body: SewingProductDto): Promise<SewingProductEntity> {
    await this.sizesService.createMany(body.sizes);
    return await this.sewingProductRepository.save(body);
  }

  async getAll(
    query: string,
    size: number,
    page: number,
    sort: string,
    by: string,
    where: string,
  ): Promise<[SewingProductEntity[], number]> {
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
  ): Promise<[SewingProductEntity[], number]> {
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

  async delete(id: string) {
    const sewingProduct = await this.sewingProductRepository.findOneOrFail(id);
    await this.fileUploadService.deleteSewingGoods(sewingProduct.id);
    return await this.sewingProductRepository.delete(sewingProduct.id);
  }
  async update(id: string, body: UpdateSewingProductDto) {
    if (body.images) {
      for (let file of body.images) {
        await this.fileUploadService.update(file, { sewingProductId: id });
      }
    }
    return await this.sewingProductRepository.update(id, body.sewingProduct);
  }

  async getDiscount(id): Promise<number> {
    return await (
      await this.sewingProductRepository.findOne(id)
    ).discount;
  }

  async getPurchaseParams(sewingProductId, sizeId): Promise<any> {
    const discount = await (
      await this.sewingProductRepository.findOne(sewingProductId)
    ).discount;

    const price = await this.sizesService.getSizePrice(sizeId);

    return {
      totalPrice: price,
      totalDiscount: discount,
    };
  }
}
