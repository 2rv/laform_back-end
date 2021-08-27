import { Injectable } from '@nestjs/common';
import { SizesEntity } from './sizes.entity';
import { SizesRepository } from './sizes.repository';
import { CreateSizeDto } from './dto/create-size.dto';

@Injectable()
export class SizesService {
  constructor(private sizesRepository: SizesRepository) {}

  async create(Sizes: CreateSizeDto[]): Promise<SizesEntity> {
    const result = await this.sizesRepository.insert(Sizes);
    return result.raw;
  }
  async update(id: string, body) {
    const result = await this.sizesRepository.update(id, body);
    return result;
  }
  async getAllPatternProducts(id: string): Promise<SizesEntity[]> {
    return await this.sizesRepository.find({
      where: {
        patternProductId: id,
      },
    });
  }
  async getAllSewingProducts(id: string): Promise<SizesEntity[]> {
    return await this.sizesRepository.find({
      where: {
        sewingProductId: id,
      },
    });
  }
}
