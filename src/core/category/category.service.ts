import { CategoryRepository } from './category.repository';
import { Injectable, BadRequestException } from '@nestjs/common';
import { CategoryDto } from './dto/category.dto';
import { CategoryEntity } from './category.entity';
import { CATEGORY_ERROR } from './enum/category.enum';
import { DeleteManyCategoriesDto } from './dto/delete-many-categories';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async create(body: CategoryDto): Promise<CategoryEntity> {
    return await this.categoryRepository.save(body);
  }

  async createMany(categories: CategoryDto[]): Promise<CategoryEntity> {
    const result = await this.categoryRepository.insert(categories);
    return result.raw;
  }

  async update(id: string, body) {
    const result = await this.categoryRepository.update(id, body);
    if (!result) {
      throw new BadRequestException(CATEGORY_ERROR.CATEGORY_NOT_FOUND);
    } else return await this.categoryRepository.findOne(id);
  }

  async getOne(id: string, query: string): Promise<CategoryEntity> {
    if (query === 'ru') {
      return await this.categoryRepository.findOneRu(id);
    }
    if (query === 'en') {
      return await this.categoryRepository.findOneEn(id);
    }
  }

  async getAll(query: string): Promise<CategoryEntity[]> {
    if (query === 'ru') {
      return await this.categoryRepository.findAllRu();
    }
    if (query === 'en') {
      return await this.categoryRepository.findAllEn();
    }
  }

  async getAllMasterClasses(id: string): Promise<CategoryEntity[]> {
    return await this.categoryRepository.find({
      where: {
        masterClassId: id,
      },
    });
  }
  async getAllPatternProducts(id: string): Promise<CategoryEntity[]> {
    return await this.categoryRepository.find({
      where: {
        patternProductId: id,
      },
    });
  }

  async getAllSewingProducts(id: string): Promise<CategoryEntity[]> {
    return await this.categoryRepository.find({
      where: {
        sewingProductId: id,
      },
    });
  }

  async delete(id: string): Promise<void> {
    const result = this.categoryRepository.findOne(id);
    if (!result) {
      throw new BadRequestException(CATEGORY_ERROR.CATEGORY_NOT_FOUND);
    } else {
      await this.categoryRepository.delete(id);
    }
  }

  async deleteMany(body: DeleteManyCategoriesDto) {
    const categories = await this.categoryRepository.findByIds(body.categories);
    const result = categories.map(({ id }) => id);
    if (result.length === 0) {
      throw new BadRequestException('SIZES_ERROR.SIZES_NOT_FOUND');
    } else {
      return await this.categoryRepository.delete(result);
    }
  }
}
