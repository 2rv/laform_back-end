import { Injectable } from '@nestjs/common';
import { CreateProgramDto } from './dto/create-program.dto';
import { ProgramEntity } from './program-entity';
import { ProgramRepository } from './program.repository';

@Injectable()
export class ProgramService {
  constructor(private programRepository: ProgramRepository) {}

  async create(programs: CreateProgramDto[]): Promise<ProgramEntity> {
    const result = await this.programRepository.insert(programs);
    return result.raw;
  }
  async update(id: string, body) {
    const result = await this.programRepository.update(id, body);
    return result;
  }
  async getAllMasterClasses(id: string): Promise<ProgramEntity[]> {
    return await this.programRepository.find({
      where: {
        masterClassId: id,
      },
    });
  }
}
