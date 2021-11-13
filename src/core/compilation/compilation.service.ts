import { Injectable } from '@nestjs/common';
import { CompilationEntity } from './compilation.entity';
import { CompilationRepository } from './compilation.repository';
import { CompilationDto } from './dto/compilation.dto';

@Injectable()
export class CompilationService {
  constructor(private compilationRepository: CompilationRepository) {}

  async create(body: CompilationDto) {
    return await this.compilationRepository.save(body);
  }
  async get(): Promise<CompilationEntity[]> {
    return await this.compilationRepository.findAll();
  }

  async getAuth(userId: number): Promise<CompilationEntity[]> {
    return await this.compilationRepository.findAllAuth(userId);
  }
  async delete(id: string) {
    return await this.compilationRepository.delete(id);
  }
}
