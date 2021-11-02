import { Injectable } from '@nestjs/common';
import { MasterClassRepository } from './master-class.repository';
import { MasterClassEntity } from './master-class.entity';
import { MasterClassDto } from './dto/master-class.dto';
import { RecommendationService } from '../recommendation/recommendation.service';
import { PurchaseProductRepository } from '../purchase-product/purchase-product.repository';

@Injectable()
export class MasterClassService {
  constructor(
    private masterClassRepository: MasterClassRepository,
    private recommendationService: RecommendationService,
    private purchaseProductRepository: PurchaseProductRepository,
  ) {}

  async save(body: MasterClassDto): Promise<MasterClassEntity> {
    const result = this.masterClassRepository.create(body);
    result.vendorCode = MasterClassEntity.getVendorCode();
    return await this.masterClassRepository.save(result);
  }

  async getAll(
    query: string,
    size: number,
    page: number,
    sort: string,
    by: string,
    where: string,
    category: string,
    allProductsPage: string,
  ): Promise<[MasterClassEntity[], number]> {
    if (sort === 'title') {
      if (query === 'ru') {
        sort = 'master_class.titleRu';
      } else if (query === 'en') {
        sort = 'master_class.titleEn';
      }
    } else if (sort === 'date') {
      sort = 'master_class.createdDate';
      by = 'ASC';
    } else sort = '';
    if (query === 'ru')
      return await this.masterClassRepository.findAllRu(
        size,
        page,
        sort,
        by,
        where,
        category,
        allProductsPage,
      );
    if (query === 'en')
      return await this.masterClassRepository.findAllEn(
        size,
        page,
        sort,
        by,
        where,
        category,
        allProductsPage,
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
    allProductsPage: string,
    userId: number,
  ): Promise<[MasterClassEntity[], number]> {
    if (sort === 'title') {
      if (query === 'ru') {
        sort = 'master_class.titleRu';
      } else if (query === 'en') {
        sort = 'master_class.titleEn';
      }
    } else if (sort === 'date') {
      sort = 'master_class.createdDate';
      by = 'ASC';
    } else sort = '';
    if (query === 'ru')
      return await this.masterClassRepository.findAllRuAuth(
        size,
        page,
        sort,
        by,
        where,
        category,
        allProductsPage,
        userId,
      );
    if (query === 'en')
      return await this.masterClassRepository.findAllEnAuth(
        size,
        page,
        sort,
        by,
        where,
        category,
        allProductsPage,
        userId,
      );
  }

  async getOne(id: string, query: string): Promise<MasterClassEntity> {
    if (query === 'ru') return await this.masterClassRepository.findOneRu(id);
    if (query === 'en') return await this.masterClassRepository.findOneEn(id);
  }
  async getOneForUpdate(id: string, query: string): Promise<MasterClassEntity> {
    if (query === 'ru') {
      return await this.masterClassRepository.findOneRuForUpdate(id);
    }
  }
  async getOneAuth(
    id: string,
    query: string,
    userId: number,
  ): Promise<MasterClassEntity> {
    if (query === 'ru')
      return await this.masterClassRepository.findOneRuAuth(id, userId);
    if (query === 'en')
      return await this.masterClassRepository.findOneEnAuth(id, userId);
  }

  async getPinned(query: string): Promise<MasterClassEntity[]> {
    if (query === 'ru') return await this.masterClassRepository.findPinnedRu();
    if (query === 'en') return await this.masterClassRepository.findPinnedEn();
  }
  async getPinnedAuth(
    query: string,
    userId: number,
  ): Promise<MasterClassEntity[]> {
    if (query === 'ru')
      return await this.masterClassRepository.findPinnedRuAuth(userId);
    if (query === 'en')
      return await this.masterClassRepository.findPinnedEnAuth(userId);
  }

  async getLiked(
    userId: number,
    query: string,
    size: number,
    page: number,
  ): Promise<[MasterClassEntity[], number]> {
    if (query === 'ru')
      return await this.masterClassRepository.findLikedRu(userId, size, page);
    if (query === 'en')
      return await this.masterClassRepository.findLikedEn(userId, size, page);
  }

  async update(id: string, body: MasterClassDto) {
    const masterClass: MasterClassEntity =
      await this.masterClassRepository.findOneOrFail(id, {
        relations: ['recommendation'],
      });
    if (masterClass.recommendation?.id) {
      await this.recommendationService.delete(masterClass.recommendation.id);
    }

    Object.assign(masterClass, { ...body });
    return await this.masterClassRepository.save(masterClass);
  }

  async updatePinned(id: string, body: any) {
    await this.masterClassRepository.update({ id }, body);
  }

  async delete(id: string) {
    const masterClass = await this.masterClassRepository.findOneOrFail(id);
    const wasPurchased = await this.purchaseProductRepository.findOne({
      masterClassId: masterClass,
    });

    if (Boolean(wasPurchased)) {
      await this.masterClassRepository.update({ id }, { deleted: true });
    } else {
      await this.masterClassRepository.delete(id);
    }
  }

  async getPriceAndDiscount(
    masterClass: MasterClassEntity,
  ): Promise<{ totalPrice: number; totalDiscount: number }> {
    const result = await this.masterClassRepository.findOne(masterClass, {
      select: ['id', 'price', 'discount'],
    });
    return {
      totalPrice: result.price || 0,
      totalDiscount: result.discount,
    };
  }
}
