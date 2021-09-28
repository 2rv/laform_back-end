import { UpdateSliderDto } from './dto/update-slider.dto';
import { SliderEntity } from './slider.entity';
import { Injectable } from '@nestjs/common';
import { SliderDto } from './dto/slider.dto';
import { SliderRepository } from './slider.repository';

@Injectable()
export class SliderService {
  constructor(private sliderRepository: SliderRepository) {}

  async create(body: SliderDto): Promise<SliderEntity> {
    return await this.sliderRepository.save(body);
  }

  async update(id: string, body: UpdateSliderDto) {
    return await this.sliderRepository.update(id, body);
  }

  async getOne(id: string, query: string): Promise<SliderEntity> {
    if (query === 'ru') return await this.sliderRepository.findOneRu(id);
    if (query === 'en') return await this.sliderRepository.findOneEn(id);
  }

  async getAll(query: string): Promise<SliderEntity[]> {
    if (query === 'ru') return await this.sliderRepository.findAllRu();
    if (query === 'en') return await this.sliderRepository.findAllEn();
  }

  async delete(id: string) {
    return await this.sliderRepository.delete(id);
  }
}
