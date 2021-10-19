import { CategoryEntity } from './category.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(CategoryEntity)
export class CategoryRepository extends Repository<CategoryEntity> {
  async findOneRu(id: string): Promise<CategoryEntity> {
    return await this.createQueryBuilder('category')
      .where('category.id = :id', { id })
      .select(['category.id', 'category.categoryNameRu'])
      .getOne();
  }
  async findOneEn(id: string): Promise<CategoryEntity> {
    return await this.createQueryBuilder('category')
      .where('category.id = :id', { id })
      .select(['category.id', 'category.categoryNameEn'])
      .getOne()
      .catch((err) => {
        throw err;
      });
  }
  async findAllRu(): Promise<CategoryEntity[]> {
    return await this.createQueryBuilder('category')
      .select(['category.id', 'category.categoryNameRu'])
      .getMany()
      .catch((err) => {
        throw err;
      });
  }
  async findAllEn(): Promise<CategoryEntity[]> {
    return await this.createQueryBuilder('category')
      .select(['category.id', 'category.categoryNameEn'])
      .getMany();
  }
}
