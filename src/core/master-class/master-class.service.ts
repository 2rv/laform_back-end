import { FileUploadService } from './../file-upload/file-upload.service';
import { MasterClassRepository } from './master-class.repository';
import { UpdateMasterClassDto } from './dto/update-master-class.dto';
import { MasterClassEntity } from './master-class.entity';
import { Injectable, BadRequestException } from '@nestjs/common';
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
    const result = await this.masterClassRepository.save(body);
    const programs = await this.programsService.createMany(body.programs);
    const categories = await this.categoriesService.createMany(body.categories);

    if (body.images) {
      for (const file of body.images) {
        await this.fileUploadService.update(file.id, {
          masterClassId: result.id,
        });
      }
    }

    if (programs) {
      for (const key in programs) {
        await this.programsService.update(programs[key], {
          masterClassId: result.id,
        });
      }
    }

    if (categories) {
      for (const key in categories) {
        await this.categoriesService.update(categories[key], {
          masterClassId: result.id,
        });
      }
    }

    return result;
  }

  async delete(id: string) {
    const images = await this.fileUploadService.getAllMasterClasses(id);
    const programs = await this.programsService.getAllMasterClasses(id);
    const categories = await this.categoriesService.getAllMasterClasses(id);

    for (const image of images) {
      await this.fileUploadService.update(image.id, { masterClassId: null });
    }
    for (const program of programs) {
      await this.programsService.update(program.id, { masterClassId: null });
    }
    for (const category of categories) {
      await this.categoriesService.update(category.id, { masterClassId: null });
    }

    return await this.masterClassRepository.delete(id);
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
      const result = await this.masterClassRepository.findOneRu(id);
      result.images = await this.fileUploadService.getAllMasterClasses(
        result.id,
      );
      return result;
    }
    if (query === 'en') {
      const result = await this.masterClassRepository.findOneEn(id);
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
    if (query === 'ru') {
      const results = await this.masterClassRepository.findAllRu(size, page);

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
      const results = await this.masterClassRepository.findAllEn(size, page);
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
}
