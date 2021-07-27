import { FileUploadService } from '../file-upload/file-upload.service';
import { PatternProductRepository } from './pattern-product.repository';
import { UpdatePatternProductDto } from './dto/update-pattern-product.dto';
import { PatternProductEntity } from './pattern-product.entity';
import { Injectable } from '@nestjs/common';
import { PatternProductDto } from './dto/pattern-product.dto';

@Injectable()
export class PatternProductService {
  constructor(
    private patternProductRepository: PatternProductRepository,
    private fileUploadService: FileUploadService,
  ) {}

  async create(body: PatternProductDto): Promise<PatternProductEntity> {
    const result = await this.patternProductRepository.save(body);
    if (body.imageUrls) {
      for (let file of body.imageUrls) {
        await this.fileUploadService.update(file, {
          patternProductId: result.id,
        });
      }
    }
    return result;
  }

  async update(id: string, body: UpdatePatternProductDto) {
    if (body.imageUrls) {
      for (let file of body.imageUrls) {
        await this.fileUploadService.update(file, { patternProductId: id });
      }
    }
    return await this.patternProductRepository.update(id, body.patternProduct);
  }

  async getOne(id: string, query: string): Promise<PatternProductEntity> {
    if (query === 'ru') {
      const result = await this.patternProductRepository.findOneRu(id);
      result.imageUrls = await this.fileUploadService.getAllPatternProducts(
        result.id,
      );
      return result;
    }
    if (query === 'en') {
      const result = await this.patternProductRepository.findOneEn(id);
      result.imageUrls = await this.fileUploadService.getAllPatternProducts(
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
        result.imageUrls = await this.fileUploadService.getAllPatternProducts(
          result.id,
        );
      }
      return results;
    }
    if (query === 'en') {
      const results = await this.patternProductRepository.findAllEn(size, page);
      for (let result of results) {
        result.imageUrls = await this.fileUploadService.getAllPatternProducts(
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
        result.imageUrls = await this.fileUploadService.getAllPatternProducts(
          result.id,
        );
      }
      return results;
    }
    if (query === 'en') {
      const results = await this.patternProductRepository.findPinnedEn();
      for (let result of results) {
        result.imageUrls = await this.fileUploadService.getAllPatternProducts(
          result.id,
        );
      }
      return results;
    }
  }

  async delete(id: string) {
    const results = await this.fileUploadService.getAllPatternProducts(id);
    for (let result of results) {
      await this.fileUploadService.update(result.id, {
        patternProductId: null,
      });
    }
    return await this.patternProductRepository.delete(id);
  }
}
