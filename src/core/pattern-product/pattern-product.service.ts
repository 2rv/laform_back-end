import { FileUploadService } from '../file-upload/file-upload.service';
import { PatternProductRepository } from './pattern-product.repository';
import { UpdatePatternProductDto } from './dto/update-pattern-product.dto';
import { PatternProductEntity } from './pattern-product.entity';
import { Injectable } from '@nestjs/common';
import { PatternProductDto } from './dto/pattern-product.dto';
import { SizesService } from '../sizes/sizes.service';
import { CategoryService } from '../category/category.service';

@Injectable()
export class PatternProductService {
  constructor(
    private patternProductRepository: PatternProductRepository,
    private fileUploadService: FileUploadService,
    private sizesService: SizesService,
    private categoriesService: CategoryService,
  ) {}

  async create(body: PatternProductDto): Promise<PatternProductEntity> {
    const result = await this.patternProductRepository.save(body);
    const categories = await this.categoriesService.createMany(body.categories);

    if (body.type === 2) {
      const sizes = await this.sizesService.createMany(body.sizes);
      if (sizes) {
        for (let key in sizes) {
          await this.sizesService.update(sizes[key], {
            patternProductId: result.id,
          });
        }
      }
    }

    if (body.images) {
      for (const image of body.images) {
        await this.fileUploadService.update(image.id, {
          patternProductId: result.id,
        });
      }
    }

    if (categories) {
      for (const key in categories) {
        await this.categoriesService.update(categories[key], {
          patternProductId: result.id,
        });
      }
    }

    return result;
  }

  async delete(id: string) {
    const images = await this.fileUploadService.getAllPatternProducts(id);
    const sizes = await this.sizesService.getAllPatternProducts(id);
    const categories = await this.categoriesService.getAllPatternProducts(id);

    for (const image of images) {
      await this.fileUploadService.update(image.id, {
        patternProductId: null,
      });
    }
    for (const size of sizes) {
      await this.sizesService.update(size.id, {
        patternProductId: null,
      });
    }
    for (const category of categories) {
      await this.categoriesService.update(category.id, {
        patternProductId: null,
      });
    }

    return await this.patternProductRepository.delete(id);
  }

  async update(id: string, body: UpdatePatternProductDto) {
    if (body.images) {
      for (let file of body.images) {
        await this.fileUploadService.update(file, { patternProductId: id });
      }
    }
    return await this.patternProductRepository.update(id, body.patternProduct);
  }

  async getOne(id: string, query: string): Promise<PatternProductEntity> {
    if (query === 'ru') {
      const result = await this.patternProductRepository.findOneRu(id);
      result.images = await this.fileUploadService.getAllPatternProducts(
        result.id,
      );
      return result;
    }
    if (query === 'en') {
      const result = await this.patternProductRepository.findOneEn(id);
      result.images = await this.fileUploadService.getAllPatternProducts(
        result.id,
      );
      return result;
    }
  }

  async getAll(
    query: string,
    size: number,
    page: number,
  ): Promise<PatternProductEntity[]> {
    if (query === 'ru') {
      const results = await this.patternProductRepository.findAllRu(size, page);
      for (let result of results) {
        result.images = await this.fileUploadService.getAllPatternProducts(
          result.id,
        );

        result.sizes = await this.sizesService.getAllPatternProducts(result.id);

        result.categories = await this.categoriesService.getAllPatternProducts(
          result.id,
        );
      }
      return results;
    }
    if (query === 'en') {
      const results = await this.patternProductRepository.findAllEn(size, page);
      for (let result of results) {
        result.images = await this.fileUploadService.getAllPatternProducts(
          result.id,
        );
      }
      return results;
    }
  }

  async getPinned(query: string): Promise<PatternProductEntity[]> {
    if (query === 'ru') {
      const results = await this.patternProductRepository.findPinnedRu();
      for (let result of results) {
        result.images = await this.fileUploadService.getAllPatternProducts(
          result.id,
        );

        result.sizes = await this.sizesService.getAllPatternProducts(result.id);

        result.categories = await this.categoriesService.getAllPatternProducts(
          result.id,
        );
      }
      return results;
    }
    if (query === 'en') {
      const results = await this.patternProductRepository.findPinnedEn();
      for (let result of results) {
        result.images = await this.fileUploadService.getAllPatternProducts(
          result.id,
        );
      }
      return results;
    }
  }
}
