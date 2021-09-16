import { FileUploadService } from '../file-upload/file-upload.service';
import { SewingProductRepository } from './sewing-product.repository';
import { UpdateSewingProductDto } from './dto/update-sewing-product.dto';
import { SewingProductEntity } from './sewing-product.entity';
import { Injectable } from '@nestjs/common';
import { SewingProductDto } from './dto/sewing-product.dto';
import { SizesService } from '../sizes/sizes.service';
import { ColorsService } from '../colors/colors.service';
import { CategoryService } from '../category/category.service';

@Injectable()
export class SewingProductService {
  constructor(
    private sewingProductRepository: SewingProductRepository,
    private fileUploadService: FileUploadService,
    private sizesService: SizesService,
    private colorsService: ColorsService,
    private categoriesService: CategoryService,
  ) {}

  async create(body: SewingProductDto): Promise<SewingProductEntity> {
    await this.categoriesService.createMany(body.categories);
    await this.sizesService.createMany(body.sizes);
    await this.colorsService.createMany(body.colors);
    return await this.sewingProductRepository.save(body);
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

  async getOne(id: string, query: string): Promise<SewingProductEntity> {
    if (query === 'ru') return await this.sewingProductRepository.findOneRu(id);
    if (query === 'en') return await this.sewingProductRepository.findOneEn(id);
  }

  async getAll(
    query: string,
    size: number,
    page: number,
  ): Promise<SewingProductEntity[]> {
    if (query === 'ru')
      return await this.sewingProductRepository.findAllRu(size, page);
    if (query === 'en')
      return await this.sewingProductRepository.findAllEn(size, page);
  }

  async getPinned(query: string): Promise<SewingProductEntity[]> {
    if (query === 'ru')
      return await this.sewingProductRepository.findPinnedRu();
    if (query === 'en')
      return await this.sewingProductRepository.findPinnedEn();
  }
}
