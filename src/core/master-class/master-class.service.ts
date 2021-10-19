import { Injectable } from '@nestjs/common';
import { MasterClassRepository } from './master-class.repository';
import { MasterClassEntity } from './master-class.entity';
import { MasterClassDto } from './dto/master-class.dto';

@Injectable()
export class MasterClassService {
  constructor(private masterClassRepository: MasterClassRepository) {}

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
  ): Promise<MasterClassEntity[]> {
    if (sort === 'title') {
      if (query === 'ru') {
        sort = 'master_class.titleRu';
      } else if (query === 'en') {
        sort = 'master_class.titleEn';
      }
    } else sort = '';
    if (query === 'ru')
      return await this.masterClassRepository.findAllRu(
        size,
        page,
        sort,
        by,
        where,
      );
    if (query === 'en')
      return await this.masterClassRepository.findAllEn(
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
  ): Promise<MasterClassEntity[]> {
    if (sort === 'title') {
      if (query === 'ru') {
        sort = 'master_class.titleRu';
      } else if (query === 'en') {
        sort = 'master_class.titleEn';
      }
    } else sort = '';
    if (query === 'ru')
      return await this.masterClassRepository.findAllRuAuth(
        size,
        page,
        sort,
        by,
        where,
        userId,
      );
    if (query === 'en')
      return await this.masterClassRepository.findAllEnAuth(
        size,
        page,
        sort,
        by,
        where,
        userId,
      );
  }

  async getOne(id: string, query: string): Promise<MasterClassEntity> {
    if (query === 'ru') return await this.masterClassRepository.findOneRu(id);
    if (query === 'en') return await this.masterClassRepository.findOneEn(id);
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

  async getLiked(userId: number, query: string): Promise<MasterClassEntity[]> {
    if (query === 'ru')
      return await this.masterClassRepository.findLikedRu(userId);
    if (query === 'en')
      return await this.masterClassRepository.findLikedEn(userId);
  }

  async update(id: string, body: MasterClassDto) {
    const masterClass = await this.masterClassRepository.findOneOrFail(id);
    return await this.masterClassRepository.update(masterClass.id, body);
  }
  async delete(id: string) {
    const masterClass = await this.masterClassRepository.findOneOrFail(id);
    return await this.masterClassRepository.delete(masterClass.id);
  }
  async getPriceAndDiscount(
    masterClass: MasterClassEntity,
  ): Promise<{ totalPrice: number; totalDiscount: number }> {
    const result = await this.masterClassRepository.findOne(masterClass, {
      select: ['id', 'price', 'discount'],
    });
    return {
      totalPrice: result.price,
      totalDiscount: result.discount,
    };
  }
}
