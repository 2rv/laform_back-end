import { Injectable } from '@nestjs/common';
import { ColorsEntity } from './colors.entity';
import { ColorsRepository } from './colors.repository';
import { CreateColorDto } from './dto/create-color.dto';

@Injectable()
export class ColorsService {
  constructor(private colorsRepository: ColorsRepository) {}

  async create(colors: CreateColorDto[]): Promise<ColorsEntity> {
    const result = await this.colorsRepository.insert(colors);
    return result.raw;
  }
  async update(id: string, body) {
    const result = await this.colorsRepository.update(id, body);
    return result;
  }
  async getAllPatternProducts(id: string): Promise<ColorsEntity[]> {
    return await this.colorsRepository.find({
      where: {
        patternProductId: id,
      },
    });
  }
  async getAllSewingProducts(id: string): Promise<ColorsEntity[]> {
    return await this.colorsRepository.find({
      where: {
        sewingProductId: id,
      },
    });
  }
}
