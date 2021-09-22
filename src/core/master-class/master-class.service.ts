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

  async create(body: MasterClassDto): Promise<any> {
    return await this.masterClassRepository.create(body);
  }

  async save(body: MasterClassDto): Promise<MasterClassEntity> {
    //await this.programsService.createMany(body.programs);
    //await this.categoriesService.createMany(body.categories);

    const masterClass = await this.create(body);

    masterClass.recommendation = body.recommendation;
    masterClass.recommendation.recommendationProducts =
      body.recommendation.recommendationProducts;
    return await this.masterClassRepository.save({
      ...masterClass,
    });
  }

  async delete(id: string) {
    const masterClass = await this.masterClassRepository.findOneOrFail(id);
    await this.fileUploadService.deleteMasterClass(masterClass.id);
    return await this.masterClassRepository.delete(masterClass.id);
  }

  async update(id: string, body: UpdateMasterClassDto) {
    // if (body.images)  this.fileUploadService.update(file, { masterClassId: id });
    return await this.masterClassRepository.update(id, body.masterClass);
  }

  async getOne(id: string, query: string): Promise<MasterClassEntity> {
    if (query === 'ru') return await this.masterClassRepository.findOneRu(id);
    if (query === 'en') return await this.masterClassRepository.findOneEn(id);
  }

  async getPurchaseParams(masterClassId, programId): Promise<any> {
    const discount = await (
      await this.masterClassRepository.findOne(masterClassId)
    ).discount;

    const price = await this.programsService.getProgramPrice(programId);

    return {
      totalPrice: price,
      totalDiscount: discount,
    };
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

  async getPinned(query: string): Promise<MasterClassEntity[]> {
    if (query === 'ru') return await this.masterClassRepository.findPinnedRu();
    if (query === 'en') return await this.masterClassRepository.findPinnedEn();
  }
}
