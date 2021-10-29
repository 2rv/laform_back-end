import { CategoryRepository } from './category.repository';
import { Injectable, BadRequestException } from '@nestjs/common';
import { CategoryDto } from './dto/category.dto';
import { CategoryEntity } from './category.entity';
import { CATEGORY_ERROR } from './enum/category.enum';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async create(body: CategoryDto): Promise<CategoryEntity> {
    const result = await this.categoryRepository.findOne({
      categoryNameRu: body.categoryNameRu,
    });

    if (result) {
      throw new BadRequestException(CATEGORY_ERROR.CATEGORY_ALREADY_EXISTS);
    } else {
      return await this.categoryRepository.save(body);
    }
  }

  async createMany(categories: CategoryDto[]): Promise<CategoryEntity> {
    const result = await this.categoryRepository.insert(categories);
    return result.raw;
  }

  async getOne(id: string, query: string): Promise<CategoryEntity> {
    if (query === 'ru') return await this.categoryRepository.findOneRu(id);
    if (query === 'en') return await this.categoryRepository.findOneEn(id);
  }

  async getAll(query: string, type: string): Promise<CategoryEntity[]> {
    if (query === 'ru') return await this.categoryRepository.findAllRu(type);
    if (query === 'en') return await this.categoryRepository.findAllEn(type);
  }

  async update(id: string, body) {
    const result = await this.categoryRepository.update(id, body);
    if (!result) {
      throw new BadRequestException(CATEGORY_ERROR.CATEGORY_NOT_FOUND);
    } else return await this.categoryRepository.findOne(id);
  }

  async delete(id: string): Promise<void> {
    const result = this.categoryRepository.findOne(id);
    if (!result) {
      throw new BadRequestException(CATEGORY_ERROR.CATEGORY_NOT_FOUND);
    } else {
      await this.categoryRepository.delete(id);
    }
  }
}
