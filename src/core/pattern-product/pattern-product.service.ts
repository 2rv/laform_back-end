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
    if (body.sizes?.length > 0) {
      await this.sizesService.createMany(body.sizes);
    }
    if (body.type === 1) {
      body.vendorCode = PatternProductEntity.getVendorCode();
    }
    await this.categoriesService.createMany(body.categories);
    return await this.patternProductRepository.save(body);
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
      for (let file of body.images) {
        await this.fileUploadService.update(file, { patternProductId: id });
      }
    }
    return await this.patternProductRepository.update(id, body.patternProduct);
  }

  async getOne(id: string, query: string): Promise<PatternProductEntity> {
    if (query === 'ru')
      return await this.patternProductRepository.findOneRu(id);
    if (query === 'en')
      return await this.patternProductRepository.findOneEn(id);
  }

  async getAll(
    query: string,
    size: number,
    page: number,
  ): Promise<PatternProductEntity[]> {
    if (query === 'ru')
      return await this.patternProductRepository.findAllRu(size, page);
    if (query === 'en')
      return await this.patternProductRepository.findAllEn(size, page);
  }

  async getPinned(query: string): Promise<PatternProductEntity[]> {
    if (query === 'ru')
      return await this.patternProductRepository.findPinnedRu();
    if (query === 'en')
      return await this.patternProductRepository.findPinnedEn();
  }
}
