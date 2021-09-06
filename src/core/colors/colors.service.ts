import { BadRequestException, Injectable } from '@nestjs/common';
import { ColorsEntity } from './colors.entity';
import { ColorsRepository } from './colors.repository';
import { CreateColorDto } from './dto/create-color.dto';
import { DeleteManyColorsDto } from './dto/delete-many-colors';

@Injectable()
export class ColorsService {
  constructor(private colorsRepository: ColorsRepository) {}

  async createMany(colors: CreateColorDto[]): Promise<ColorsEntity> {
    const result = await this.colorsRepository.insert(colors);
    return result.raw;
  }

  async deleteSewingGoods(id) {
    await this.colorsRepository.delete({ sewingProductId: id });
  }

  async update(id: string, body) {
    return await this.colorsRepository.update(id, body);
  }

  async getAllSewingProducts(id: string): Promise<ColorsEntity[]> {
    return await this.colorsRepository.find({
      where: {
        sewingProductId: id,
      },
    });
  }

  async getAll(): Promise<ColorsEntity[]> {
    return await this.colorsRepository.find();
  }

  async delete(id: string): Promise<void> {
    const result = this.colorsRepository.findOne(id);
    if (!result) {
      throw new BadRequestException('COLORS_ERROR.COLOR_NOT_FOUND');
    } else await this.colorsRepository.delete(id);
  }

  async deleteMany(body: DeleteManyColorsDto) {
    const colors = await this.colorsRepository.findByIds(body.colors);
    const result = colors.map(({ id }) => id);
    if (result.length === 0) {
      throw new BadRequestException('COLORS_ERROR.COLORS_NOT_FOUND');
    } else {
      return await this.colorsRepository.delete(result);
    }
  }
}
