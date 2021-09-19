import { Response } from '@nestjs/common';
import { SewingProductEntity } from './sewing-product.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(SewingProductEntity)
export class SewingProductRepository extends Repository<SewingProductEntity> {
  async findOneRu(id: string): Promise<SewingProductEntity> {
    return await this.createQueryBuilder('sewing_product')
      .where('sewing_product.id = :id', { id })
      .leftJoin('sewing_product.comment', 'comment')
      .leftJoin('comment.userId', 'userId')
      .leftJoin('comment.subComment', 'subComment')
      .leftJoin('subComment.userId', 'user')
      .leftJoin('sewing_product.images', 'images')
      .leftJoin('sewing_product.sizes', 'sizes')
      .leftJoin('sewing_product.colors', 'colors')
      .leftJoin('sewing_product.categories', 'categories')
      .select([
        'sewing_product.id',
        'sewing_product.titleRu',
        'sewing_product.descriptionRu',
        'sewing_product.discount',
        'sewing_product.modifier',
        'sewing_product.type',
        'sewing_product.pinned',
        'comment',
        'userId.login',
        'subComment',
        'user.login',
        'images',
        'sizes',
        'colors',
        'categories',
      ])
      .getOne();
  }

  async findAllRu(
    size: number,
    page: number,
  ): Promise<{ products: SewingProductEntity[]; total: number }> {
    const take = size || 200;
    const skip = (page - 1) * size || 0;

    const [products, total] = await this.findAndCount({
      where: {
        deleted: false,
      },
      relations: ['images', 'sizes', 'colors', 'categories'],
      select: [
        'id',
        'titleRu',
        'descriptionRu',
        'discount',
        'modifier',
        'type',
        'pinned',
      ],
      take,
      skip,
    });

    return {
      products,
      total,
    };

    // return await this.createQueryBuilder('sewing_product')
    //   .leftJoin('sewing_product.images', 'images')
    //   .leftJoin('sewing_product.sizes', 'sizes')
    //   .leftJoin('sewing_product.colors', 'colors')
    //   .leftJoin('sewing_product.categories', 'categories')
    // .select([
    //   'sewing_product.id',
    //   'sewing_product.titleRu',
    //   'sewing_product.descriptionRu',
    //   'sewing_product.discount',
    //   'sewing_product.modifier',
    //   'sewing_product.type',
    //   'sewing_product.pinned',
    //   'images',
    //   'sizes',
    //   'colors',
    //   'categories',
    // ])
    //   .where('sewing_product.deleted = false')
    //   .limit(take)
    //   .offset(skip)
    //   .getMany()
  }

  async findPinnedRu(): Promise<SewingProductEntity[]> {
    return await this.createQueryBuilder('sewing_product')
      .leftJoin('sewing_product.comment', 'comment')
      .leftJoin('comment.userId', 'userId')
      .leftJoin('comment.subComment', 'subComment')
      .leftJoin('subComment.userId', 'user')
      .select([
        'sewing_product.id',
        'sewing_product.titleRu',
        'sewing_product.descriptionRu',
        'sewing_product.discount',
        'sewing_product.modifier',
        'sewing_product.type',
        'sewing_product.pinned',
        'comment',
        'userId.login',
        'subComment',
        'user.login',
      ])
      .where('sewing_product.pinned = true')
      .getMany();
  }

  async findOneEn(id: string): Promise<SewingProductEntity> {
    return await this.createQueryBuilder('sewing_product')
      .leftJoin('sewing_product.comment', 'comment')
      .leftJoin('comment.userId', 'userId')
      .leftJoin('comment.subComment', 'subComment')
      .leftJoin('subComment.userId', 'user')
      .select([
        'sewing_product.id',
        'sewing_product.titleEn',
        'sewing_product.descriptionEn',
        'sewing_product.discount',
        'sewing_product.modifier',
        'sewing_product.type',
        'sewing_product.pinned',
        'comment',
        'userId.login',
        'subComment',
        'user.login',
      ])
      .where('sewing_product.id = :id', { id })
      .getOne();
  }

  async findAllEn(
    size: number,
    page: number,
  ): Promise<{ products: SewingProductEntity[]; total: number }> {
    const take = size || 10;
    const skip = (page - 1) * size || 0;

    const [products, total] = await this.findAndCount({
      where: {
        deleted: false,
      },
      relations: ['images', 'sizes', 'colors', 'categories'],
      select: [
        'id',
        'titleEn',
        'descriptionEn',
        'discount',
        'modifier',
        'type',
        'pinned',
      ],
      take,
      skip,
    });

    return {
      products,
      total,
    };

    // return await this.createQueryBuilder('sewing_product')
    //   .leftJoin('sewing_product.comment', 'comment')
    //   .leftJoin('comment.userId', 'userId')
    //   .leftJoin('comment.subComment', 'subComment')
    //   .leftJoin('subComment.userId', 'user')
    //   .leftJoin('sewing_product.images', 'images')
    //   .leftJoin('sewing_product.sizes', 'sizes')
    //   .leftJoin('sewing_product.colors', 'colors')
    //   .leftJoin('sewing_product.categories', 'categories')
    //   .select([
    //     'sewing_product.id',
    //     'sewing_product.titleEn',
    //     'sewing_product.descriptionEn',
    //     'sewing_product.discount',
    //     'sewing_product.modifier',
    //     'sewing_product.type',
    //     'sewing_product.pinned',
    //     'comment',
    //     'userId.login',
    //     'subComment',
    //     'user.login',
    //     'images',
    //     'sizes',
    //     'colors',
    //     'categories',
    //   ])
    //   .where('sewing_product.deleted = false')
    //   .limit(take)
    //   .offset(skip)
    //   .getMany();
  }

  async findPinnedEn(): Promise<SewingProductEntity[]> {
    return await this.createQueryBuilder('sewing_product')
      .leftJoin('sewing_product.comment', 'comment')
      .leftJoin('comment.userId', 'userId')
      .leftJoin('comment.subComment', 'subComment')
      .leftJoin('subComment.userId', 'user')
      .where('sewing_product.pinned = true')
      .select([
        'sewing_product.id',
        'sewing_product.titleEn',
        'sewing_product.descriptionEn',
        'sewing_product.discount',
        'sewing_product.modifier',
        'sewing_product.type',
        'sewing_product.pinned',
        'comment',
        'userId.login',
        'subComment',
        'user.login',
      ])
      .getMany();
  }
}
