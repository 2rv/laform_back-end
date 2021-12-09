import { Injectable, BadRequestException } from '@nestjs/common';
import { FooterDto } from './dto/footer.dto';
import { FooterEntity } from './footer.entity';
import { FooterRepository } from './footer.repository';

@Injectable()
export class FooterService {
  constructor(private footerRepository: FooterRepository) {}

  async create(body: FooterDto): Promise<FooterEntity> {
    return await this.footerRepository.save(body);
  }

  async getOne(id: string): Promise<FooterEntity> {
    return await this.footerRepository.findOne(id);
  }

  async getAll(): Promise<FooterEntity[]> {
    return await this.footerRepository.find();
  }

  async update(id: string, body: FooterDto) {
    return await this.footerRepository.update(id, body);
  }

  async delete(id: string): Promise<void> {
    await this.footerRepository.delete(id);
  }
}
