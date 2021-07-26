import { MasterClassRepository } from './master-class.repository';
import { UpdateMasterClassDto } from './dto/update-master-class.dto';
import { MasterClassEntity } from './master-class.entity';
import { Injectable, BadRequestException } from '@nestjs/common';
import { MasterClassDto } from './dto/master-class.dto';
import { MASTER_CLASS_ERROR } from './enum/master-class.enum';

@Injectable()
export class MasterClassService {
  constructor(private masterClassRepository: MasterClassRepository) {}

  async create(body: any): Promise<any> {
    return await this.masterClassRepository.save(body);
  }

  async update(id: string, body: UpdateMasterClassDto) {
    const result = await this.masterClassRepository.update(id, body);
    if (!result) {
      throw new BadRequestException(MASTER_CLASS_ERROR.MASTER_CLASS_NOT_FOUND);
    } else return await this.masterClassRepository.getOne(id);
  }

  async getOne(id: string, query: string): Promise<MasterClassEntity> {
    if (query === 'ru') {
      return await this.masterClassRepository.findOneRu(id);
    }
    if (query === 'en') {
      return await this.masterClassRepository.findOneEn(id);
    }
  }

  async getAll(query: string): Promise<MasterClassEntity[]> {
    if (query === 'ru') {
      return await this.masterClassRepository.findAllRu();
    }
    if (query === 'en') {
      return await this.masterClassRepository.findAllEn();
    }
    return await this.masterClassRepository.find();
  }

  async delete(id: string): Promise<void> {
    const result = this.masterClassRepository.findOneOrFail(id);
    if (!result) {
      throw new BadRequestException(MASTER_CLASS_ERROR.MASTER_CLASS_NOT_FOUND);
    } else await this.masterClassRepository.delete(id);
  }
}
