import { CategoryRepository } from './category.repository';
import { Injectable } from '@nestjs/common';
import { CategoryDto } from './dto/category.dto';
import { CategoryEntity } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async create(body: CategoryDto): Promise<CategoryEntity> {
    return await this.categoryRepository.save(body);
  }

  async update(id: string, body: CategoryDto) {
    const result = await this.categoryRepository.update(id, body);
    if (result) {
      return await this.categoryRepository.findOne(id);
    } else return null;
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
    return await this.categoryRepository.find();
  }

  async delete(id: string): Promise<void> {
    const result = this.categoryRepository.findOne(id);
    if (result) {
      await this.categoryRepository.delete(id);
    }
  }
}
