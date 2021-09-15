import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProgramDto } from './dto/create-program.dto';
import { DeleteManyProgramsDto } from './dto/delete-many-programs.dto';
import { ProgramsEntity } from './programs.entity';
import { ProgramsRepository } from './programs.repository';

@Injectable()
export class ProgramsService {
  constructor(private programsRepository: ProgramsRepository) {}

  async create(body: CreateProgramDto): Promise<ProgramsEntity> {
    body.vendorCode = ProgramsEntity.getVendorCode();
    return await this.programsRepository.save(body);
  }

  async createMany(programs: CreateProgramDto[]): Promise<ProgramsEntity> {
    programs.map((item) => {
      item.vendorCode = ProgramsEntity.getVendorCode();
      return item;
    });
    const result = await this.programsRepository.insert(programs);
    return result.raw;
  }

  async update(id: string, body) {
    return await this.programsRepository.update(id, body);
  }

  async getAllMasterClasses(id: string): Promise<ProgramsEntity[]> {
    return await this.programsRepository.find({
      where: {
        masterClassId: id,
      },
    });
  }

  async getAll(): Promise<ProgramsEntity[]> {
    return await this.programsRepository.find();
  }

  async delete(id: string): Promise<void> {
    const result = this.programsRepository.findOne(id);
    if (!result) {
      throw new BadRequestException('PROGRAMS_ERROR.PROGRAM_NOT_FOUND');
    } else await this.programsRepository.delete(id);
  }

  async deleteMany(body: DeleteManyProgramsDto) {
    const programs = await this.programsRepository.findByIds(body.programs);
    const result = programs.map(({ id }) => id);
    if (result.length === 0) {
      throw new BadRequestException('PROGRAMS_ERROR.PROGRAMS_NOT_FOUND');
    } else {
      return await this.programsRepository.delete(result);
    }
  }

  async deleteMasterClass(id) {
    await this.programsRepository.delete({ masterClassId: id });
  }
}
