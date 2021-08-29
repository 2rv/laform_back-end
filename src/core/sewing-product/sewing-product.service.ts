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
    const result = await this.sewingProductRepository.save(body);
    const categories = await this.categoriesService.createMany(body.categories);

    const sizes = await this.sizesService.createMany(body.sizes);
    if (sizes) {
      for (let key in sizes) {
        await this.sizesService.update(sizes[key], {
          sewingProductId: result.id,
        });
      }
    }
    const colors = await this.colorsService.createMany(body.colors);

    if (colors) {
      for (let key in colors) {
        await this.colorsService.update(colors[key], {
          sewingProductId: result.id,
        });
      }
    }

    if (body.images) {
      for (let file of body.images) {
        await this.fileUploadService.update(file, {
          sewingProductId: result.id,
        });
      }
    }

    if (categories) {
      for (const key in categories) {
        await this.categoriesService.update(categories[key], {
          sewingProductId: result.id,
        });
      }
    }

    return result;
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
    if (query === 'ru') {
      const results = await this.sewingProductRepository.findAllRu(size, page);
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
      const results = await this.sewingProductRepository.findAllEn(size, page);
      for (let result of results) {
        result.images = await this.fileUploadService.getAllSewingProducts(
          result.id,
        );
      }
      return results;
    }
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

  async delete(id: string) {
    const images = await this.fileUploadService.getAllSewingProducts(id);
    const colors = await this.colorsService.getAllSewingProducts(id);
    const sizes = await this.sizesService.getAllSewingProducts(id);

    for (let image of images) {
      await this.fileUploadService.update(image.id, { sewingProductId: null });
    }
    for (let color of colors) {
      await this.colorsService.update(color.id, { sewingProductId: null });
    }
    for (let size of sizes) {
      await this.sizesService.update(size.id, { sewingProductId: null });
    }

    return await this.sewingProductRepository.delete(id);
  }
}
