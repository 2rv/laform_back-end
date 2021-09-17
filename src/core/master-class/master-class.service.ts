import { FileUploadService } from './../file-upload/file-upload.service';
import { MasterClassRepository } from './master-class.repository';
import { UpdateMasterClassDto } from './dto/update-master-class.dto';
import { MasterClassEntity } from './master-class.entity';
import { Injectable } from '@nestjs/common';
import { MasterClassDto } from './dto/master-class.dto';
import { ProgramsService } from '../programs/programs.service';
import { CategoryService } from '../category/category.service';

@Injectable()
export class MasterClassService {
  constructor(
    private masterClassRepository: MasterClassRepository,
    private fileUploadService: FileUploadService,
    private programsService: ProgramsService,
    private categoriesService: CategoryService,
  ) {}

  async create(body: MasterClassDto): Promise<MasterClassEntity> {
    await this.programsService.createMany(body.programs);
    await this.categoriesService.createMany(body.categories);
    return await this.masterClassRepository.save(body);
  }

  async delete(id: string) {
    const masterClass = await this.masterClassRepository.findOneOrFail(id);
    await this.fileUploadService.deleteMasterClass(masterClass.id);
    await this.programsService.deleteMasterClass(masterClass.id);
    await this.categoriesService.deleteMasterClass(masterClass.id);
    return await this.masterClassRepository.delete(masterClass.id);
  }

  async update(id: string, body: UpdateMasterClassDto) {
    if (body.images) {
      for (let file of body.images) {
        await this.fileUploadService.update(file, { masterClassId: id });
      }
    }
    return await this.masterClassRepository.update(id, body.masterClass);
  }

  async getOne(id: string, query: string): Promise<MasterClassEntity> {
    if (query === 'ru') {
      return await this.masterClassRepository.findOneRu(id);
    }
    if (query === 'en') {
      const result = await this.masterClassRepository.findOneEn(id);
      result.images = await this.fileUploadService.getAllMasterClasses(
        result.id,
      );
      return result;
    }
  }

  async getOneAuth(
    id: string,
    query: string,
    userId: number,
  ): Promise<MasterClassEntity> {
    if (query === 'ru') {
      return await this.masterClassRepository.findOneRuAuth(id, userId);
    }
    if (query === 'en') {
      const result = await this.masterClassRepository.findOneEnAuth(id, userId);
      result.images = await this.fileUploadService.getAllMasterClasses(
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
    if (query === 'ru')
      return await this.masterClassRepository.findAllRu(size, page);
    if (query === 'en')
      return await this.masterClassRepository.findAllEn(size, page);
  }

  async getAllAuth(
    query: string,
    size: number,
    page: number,
    userId: number,
  ): Promise<MasterClassEntity[]> {
    if (query === 'ru')
      return await this.masterClassRepository.findAllRuAuth(size, page, userId);
    if (query === 'en')
      return await this.masterClassRepository.findAllEnAuth(size, page, userId);
  }

  async getPinned(query: string): Promise<MasterClassEntity[]> {
    if (query === 'ru') {
      const results = await this.masterClassRepository.findPinnedRu();
      for (let result of results) {
        result.images = await this.fileUploadService.getAllMasterClasses(
          result.id,
        );
        result.programs = await this.programsService.getAllMasterClasses(
          result.id,
        );
        result.categories = await this.categoriesService.getAllMasterClasses(
          result.id,
        );
      }
      return results;
    }
    if (query === 'en') {
      const results = await this.masterClassRepository.findPinnedEn();
      for (let result of results) {
        result.images = await this.fileUploadService.getAllMasterClasses(
          result.id,
        );
      }
      return results;
    }
  }

  async getPinnedAuth(
    query: string,
    userId: number,
  ): Promise<MasterClassEntity[]> {
    if (query === 'ru') {
      const results = await this.masterClassRepository.findPinnedRuAuth(userId);
      for (const result of results) {
        result.images = await this.fileUploadService.getAllMasterClasses(
          result.id,
        );
        result.programs = await this.programsService.getAllMasterClasses(
          result.id,
        );
        result.categories = await this.categoriesService.getAllMasterClasses(
          result.id,
        );
      }
      return results;
    }
    if (query === 'en') {
      const results = await this.masterClassRepository.findPinnedEnAuth(userId);
      for (const result of results) {
        result.images = await this.fileUploadService.getAllMasterClasses(
          result.id,
        );
      }
      return results;
    }
  }
}
