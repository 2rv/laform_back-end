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
    await this.categoriesService.deleteSewingGoods(sewingProduct.id);
    await this.fileUploadService.deleteSewingGoods(sewingProduct.id);
    await this.colorsService.deleteSewingGoods(sewingProduct.id);
    await this.sizesService.deleteSewingGoods(sewingProduct.id);
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
    if (query === 'ru') {
      const result = await this.sewingProductRepository.findOneRu(id);
      result.images = await this.fileUploadService.getAllSewingProducts(
        result.id,
      );
      return result;
    }
    if (query === 'en') {
      const result = await this.sewingProductRepository.findOneEn(id);
      result.images = await this.fileUploadService.getAllSewingProducts(
        result.id,
      );
      return result;
    }
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
    if (query === 'ru') {
      const results = await this.sewingProductRepository.findPinnedRu();
      for (let result of results) {
        result.images = await this.fileUploadService.getAllSewingProducts(
          result.id,
        );

        result.sizes = await this.sizesService.getAllSewingProducts(result.id);

        result.colors = await this.colorsService.getAllSewingProducts(
          result.id,
        );

        result.categories = await this.categoriesService.getAllSewingProducts(
          result.id,
        );
      }
      return results;
    }
    if (query === 'en') {
      const results = await this.sewingProductRepository.findPinnedEn();
      for (let result of results) {
        result.images = await this.fileUploadService.getAllSewingProducts(
          result.id,
        );
      }
      return results;
    }
  }
}
