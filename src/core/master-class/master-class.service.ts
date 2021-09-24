import { Injectable } from '@nestjs/common';
import { MasterClassRepository } from './master-class.repository';
import { MasterClassEntity } from './master-class.entity';
import { ProgramsService } from '../programs/programs.service';
import { FileUploadService } from './../file-upload/file-upload.service';
import { UpdateMasterClassDto } from './dto/update-master-class.dto';
import { MasterClassDto } from './dto/master-class.dto';

@Injectable()
export class MasterClassService {
  constructor(
    private masterClassRepository: MasterClassRepository,
    private fileUploadService: FileUploadService,
    private programsService: ProgramsService,
  ) {}

  async save(body: MasterClassDto): Promise<MasterClassEntity> {
    await this.programsService.createMany(body.programs);
    return await this.masterClassRepository.save(body);
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

  async getOne(id: string, query: string): Promise<MasterClassEntity> {
    if (query === 'ru') return await this.masterClassRepository.findOneRu(id);
    if (query === 'en') return await this.masterClassRepository.findOneEn(id);
  }
  async getOneAuth(
    id: string,
    query: string,
    userId: number,
  ): Promise<MasterClassEntity> {
    if (query === 'ru')
      return await this.masterClassRepository.findOneRuAuth(id, userId);
    if (query === 'en')
      return await this.masterClassRepository.findOneEnAuth(id, userId);
  }

  async getPinned(query: string): Promise<MasterClassEntity[]> {
    if (query === 'ru') return await this.masterClassRepository.findPinnedRu();
    if (query === 'en') return await this.masterClassRepository.findPinnedEn();
  }
  async getPinnedAuth(
    query: string,
    userId: number,
  ): Promise<MasterClassEntity[]> {
    if (query === 'ru')
      return await this.masterClassRepository.findPinnedRuAuth(userId);
    if (query === 'en')
      return await this.masterClassRepository.findPinnedEnAuth(userId);
  }

  async getLiked(userId: number, query: string): Promise<MasterClassEntity[]> {
    if (query === 'ru')
      return await this.masterClassRepository.findLikedRu(userId);
    if (query === 'en')
      return await this.masterClassRepository.findLikedEn(userId);
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
  async delete(id: string) {
    const masterClass = await this.masterClassRepository.findOneOrFail(id);
    await this.fileUploadService.deleteMasterClass(masterClass.id);
    return await this.masterClassRepository.delete(masterClass.id);
  }
  async update(id: string, body: UpdateMasterClassDto) {
    // if (body.images)  this.fileUploadService.update(file, { masterClassId: id });
    return await this.masterClassRepository.update(id, body.masterClass);
  }
}
