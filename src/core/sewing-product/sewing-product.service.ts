import { FileUploadService } from '../file-upload/file-upload.service';
import { SewingProductRepository } from './sewing-product.repository';
import { UpdateSewingProductDto } from './dto/update-sewing-product.dto';
import { SewingProductEntity } from './sewing-product.entity';
import { Injectable } from '@nestjs/common';
import { SewingProductDto } from './dto/sewing-product.dto';

@Injectable()
export class SewingProductService {
  constructor(
    private sewingProductRepository: SewingProductRepository,
    private fileUploadService: FileUploadService,
  ) {}

  async create(body: SewingProductDto): Promise<SewingProductEntity> {
    const result = await this.sewingProductRepository.save(body);
    if (body.imageUrls) {
      for (let file of body.imageUrls) {
        await this.fileUploadService.update(file, {
          sewingProductId: result.id,
        });
      }
    }
    return result;
  }

  async update(id: string, body: UpdateSewingProductDto) {
    if (body.imageUrls) {
      for (let file of body.imageUrls) {
        await this.fileUploadService.update(file, { sewingProductId: id });
      }
    }
    return await this.sewingProductRepository.update(id, body.sewingProduct);
  }

  async getOne(id: string, query: string): Promise<SewingProductEntity> {
    if (query === 'ru') {
      const result = await this.sewingProductRepository.findOneRu(id);
      result.imageUrls = await this.fileUploadService.getAllSewingProducts(
        result.id,
      );
      return result;
    }
    if (query === 'en') {
      const result = await this.sewingProductRepository.findOneEn(id);
      result.imageUrls = await this.fileUploadService.getAllSewingProducts(
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
        result.imageUrls = await this.fileUploadService.getAllSewingProducts(
          result.id,
        );
      }
      return results;
    }
    if (query === 'en') {
      const results = await this.sewingProductRepository.findAllEn(size, page);
      for (let result of results) {
        result.imageUrls = await this.fileUploadService.getAllSewingProducts(
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
        result.imageUrls = await this.fileUploadService.getAllSewingProducts(
          result.id,
        );
      }
      return results;
    }
    if (query === 'en') {
      const results = await this.sewingProductRepository.findPinnedEn();
      for (let result of results) {
        result.imageUrls = await this.fileUploadService.getAllSewingProducts(
          result.id,
        );
      }
      return results;
    }
  }

  async delete(id: string) {
    const results = await this.fileUploadService.getAllSewingProducts(id);
    for (let result of results) {
      await this.fileUploadService.update(result.id, { sewingProductId: null });
    }
    return await this.sewingProductRepository.delete(id);
  }
}
