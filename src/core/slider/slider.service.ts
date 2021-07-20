import { UpdateSliderDto } from './dto/update-slider.dto';
import { SliderEntity } from './slider.entity';
import { Injectable, BadRequestException } from '@nestjs/common';
import { SliderDto } from './dto/slider.dto';
import { SliderRepository } from './slider.repository';
import { SLIDER_ERROR } from './enum/slider.enum';

@Injectable()
export class SliderService {
  constructor(private sliderRepository: SliderRepository) {}

  async create(body: SliderDto): Promise<SliderEntity> {
    return await this.sliderRepository.save(body);
  }

  async update(id: string, body: UpdateSliderDto) {
    const result = await this.sliderRepository.update(id, body);
    if (!result) {
      throw new BadRequestException(SLIDER_ERROR.SLIDER_NOT_FOUND);
    } else return await this.sliderRepository.getOne(id);
  }

  async getOne(id: string, query: string): Promise<SliderEntity> {
    if (query === 'ru') {
      return await this.sliderRepository.findOneRu(id);
    }
    if (query === 'en') {
      return await this.sliderRepository.findOneEn(id);
    }
  }

  async getAll(query: string): Promise<SliderEntity[]> {
    if (query === 'ru') {
      return await this.sliderRepository.findAllRu();
    }
    if (query === 'en') {
      return await this.sliderRepository.findAllEn();
    }
    return await this.sliderRepository.find();
  }

  async delete(id: string): Promise<void> {
    const result = this.sliderRepository.findOneOrFail(id);
    if (!result) {
      throw new BadRequestException(SLIDER_ERROR.SLIDER_NOT_FOUND);
    } else await this.sliderRepository.delete(id);
  }
}
