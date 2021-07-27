import { FileUploadService } from './../file-upload/file-upload.service';
import { MasterClassRepository } from './master-class.repository';
import { UpdateMasterClassDto } from './dto/update-master-class.dto';
import { MasterClassEntity } from './master-class.entity';
import { Injectable, BadRequestException } from '@nestjs/common';
import { MasterClassDto } from './dto/master-class.dto';

@Injectable()
export class MasterClassService {
  constructor(
    private masterClassRepository: MasterClassRepository,
    private fileUploadService: FileUploadService,
  ) {}

  async create(body: MasterClassDto): Promise<MasterClassEntity> {
    const result = await this.masterClassRepository.save(body);
    if (body.imageUrls) {
      for (let file of body.imageUrls) {
        await this.fileUploadService.update(file, { masterClassId: result.id });
      }
    }
    return result;
  }

  async update(id: string, body: UpdateMasterClassDto) {
    if (body.imageUrls) {
      for (let file of body.imageUrls) {
        await this.fileUploadService.update(file, { masterClassId: id });
      }
    }
    return await this.masterClassRepository.update(id, body.masterClass);
  }

  async getOne(id: string, query: string): Promise<MasterClassEntity> {
    if (query === 'ru') {
      const result = await this.masterClassRepository.findOneRu(id);
      result.imageUrls = await this.fileUploadService.getAllMasterClasses(
        result.id,
      );
      return result;
    }
    if (query === 'en') {
      const result = await this.masterClassRepository.findOneEn(id);
      result.imageUrls = await this.fileUploadService.getAllMasterClasses(
        result.id,
      );
      return result;
    }
  }

  async getAll(
    query: string,
    size: number,
    page: number,
  ): Promise<MasterClassEntity[]> {
    if (query === 'ru') {
      const results = await this.masterClassRepository.findAllRu(size, page);
      for (let result of results) {
        result.imageUrls = await this.fileUploadService.getAllMasterClasses(
          result.id,
        );
      }
      return results;
    }
    if (query === 'en') {
      const results = await this.masterClassRepository.findAllEn(size, page);
      for (let result of results) {
        result.imageUrls = await this.fileUploadService.getAllMasterClasses(
          result.id,
        );
      }
      return results;
    }
  }

  async getPinned(query: string): Promise<MasterClassEntity[]> {
    if (query === 'ru') {
      const results = await this.masterClassRepository.findPinnedRu();
      for (let result of results) {
        result.imageUrls = await this.fileUploadService.getAllMasterClasses(
          result.id,
        );
      }
      return results;
    }
    if (query === 'en') {
      const results = await this.masterClassRepository.findPinnedEn();
      for (let result of results) {
        result.imageUrls = await this.fileUploadService.getAllMasterClasses(
          result.id,
        );
      }
      return results;
    }
  }

  async delete(id: string) {
    const results = await this.fileUploadService.getAllMasterClasses(id);
    for (let result of results) {
      await this.fileUploadService.update(result.id, { masterClassId: null });
    }
    return await this.masterClassRepository.delete(id);
  }
}
