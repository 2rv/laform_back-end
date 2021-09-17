import { BadRequestException, Injectable } from '@nestjs/common';
import { SizesEntity } from './sizes.entity';
import { SizesRepository } from './sizes.repository';
import { CreateSizeDto } from './dto/create-size.dto';
import { DeleteManySizesDto } from './dto/delete-many-sizes.dto';

@Injectable()
export class SizesService {
  constructor(private sizesRepository: SizesRepository) {}

  async createMany(sizes: CreateSizeDto[]): Promise<SizesEntity> {
    const sizesWithVendorCode = sizes.map((item) => {
      item.vendorCode = SizesEntity.getVendorCode();
      return item;
    });
    const result = await this.sizesRepository.insert(sizesWithVendorCode);
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

  async getAll(): Promise<SizesEntity[]> {
    return await this.sizesRepository.find();
  }

  async delete(id: string): Promise<void> {
    const result = this.sizesRepository.findOne(id);
    if (!result) {
      throw new BadRequestException('SIZES_ERROR.SIZE_NOT_FOUND');
    } else await this.sizesRepository.delete(id);
  }

  async deletePatternProduct(id) {
    await this.sizesRepository.delete({ patternProductId: id });
  }
  async deleteSewingGoods(id) {
    await this.sizesRepository.delete({ sewingProductId: id });
  }
  async deleteMany(body: DeleteManySizesDto) {
    const sizes = await this.sizesRepository.findByIds(body.sizes);
    const result = sizes.map(({ id }) => id);
    if (result.length === 0) {
      throw new BadRequestException('SIZES_ERROR.SIZES_NOT_FOUND');
    } else {
      return await this.sizesRepository.delete(result);
    }
  }
}
