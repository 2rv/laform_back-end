import { PostEntity } from './post.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(PostEntity)
export class PostRepository extends Repository<PostEntity> {
  async findOneRu(id: string): Promise<PostEntity> {
    return await this.createQueryBuilder('post')
      .leftJoin('post.imageUrl', 'image_url')
      .leftJoin('post.categoryId', 'category_id')
      .where('post.id = :id', { id })
      .select([
        'post.id',
        'post.titleRu',
        'post.textRu',
        'post.createdDate',
        'post.likeCount',
        'image_url',
        'category_id.textRu',
      ])
      .getOne()
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        throw err;
      });
  }

  async findBestRu(): Promise<PostEntity[]> {
    return await this.createQueryBuilder('post')
      .leftJoin('post.imageUrl', 'image_url')
      .leftJoin('post.categoryId', 'category_id')
      .select([
        'post.id',
        'post.titleRu',
        'post.textRu',
        'post.likeCount',
        'post.createdDate',
        'image_url',
        'category_id.textRu',
      ])
      .orderBy('RANDOM()')
      .limit(3)
      .getMany()
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        throw err;
      });
  }

  async findPinnedRu(): Promise<PostEntity[]> {
    return await this.createQueryBuilder('post')
      .leftJoin('post.imageUrl', 'image_url')
      .leftJoin('post.categoryId', 'category_id')
      .where('post.pinned = true')
      .select([
        'post.id',
        'post.titleRu',
        'post.textRu',
        'post.createdDate',
        'post.likeCount',
        'image_url',
        'category_id.textRu',
      ])
      .getMany()
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        throw err;
      });
  }

  async findAllRu(
    size: number,
    page: number,
    sort: string,
    by: any,
  ): Promise<PostEntity[]> {
    const take = size || 10;
    const skip = (page - 1) * size || 0;
    return await this.createQueryBuilder('post')
      .leftJoin('post.imageUrl', 'image_url')
      .leftJoin('post.categoryId', 'category_id')
      .select([
        'post.id',
        'post.titleRu',
        'post.textRu',
        'post.createdDate',
        'post.likeCount',
        'image_url',
        'category_id.textRu',
      ])
      .orderBy(sort, by)
      .limit(take)
      .offset(skip)
      .getMany()
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        throw err;
      });
  }

  async findOneEn(id: string): Promise<PostEntity> {
    return await this.createQueryBuilder('post')
      .leftJoin('post.imageUrl', 'image_url')
      .leftJoin('post.categoryId', 'category_id')
      .where('post.id = :id', { id })
      .select([
        'post.id',
        'post.titleEn',
        'post.textEn',
        'post.createdDate',
        'post.likeCount',
        'image_url',
        'category_id.textEn',
      ])
      .getOne()
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        throw err;
      });
  }

  async findBestEn(): Promise<PostEntity[]> {
    return await this.createQueryBuilder('post')
      .leftJoin('post.imageUrl', 'image_url')
      .leftJoin('post.categoryId', 'category_id')
      .select([
        'post.id',
        'post.titleEn',
        'post.textEn',
        'post.createdDate',
        'post.likeCount',
        'image_url',
        'category_id.textEn',
      ])
      .orderBy('RANDOM()')
      .limit(3)
      .getMany()
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        throw err;
      });
  }

  async findPinnedEn(): Promise<PostEntity[]> {
    return await this.createQueryBuilder('post')
      .leftJoin('post.imageUrl', 'image_url')
      .leftJoin('post.categoryId', 'category_id')
      .where('post.pinned = true')
      .select([
        'post.id',
        'post.titleEn',
        'post.textEn',
        'post.createdDate',
        'post.likeCount',
        'image_url',
        'category_id.textEn',
      ])
      .getMany()
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        throw err;
      });
  }

  async findAllEn(
    size: number,
    page: number,
    sort: string,
    by: any,
  ): Promise<PostEntity[]> {
    const take = size || 10;
    const skip = (page - 1) * size || 0;
    return await this.createQueryBuilder('post')
      .leftJoin('post.imageUrl', 'image_url')
      .leftJoin('post.categoryId', 'category_id')
      .select([
        'post.id',
        'post.titleEn',
        'post.textEn',
        'post.createdDate',
        'post.likeCount',
        'image_url',
        'category_id.textEn',
      ])
      .orderBy(sort, by)
      .limit(take)
      .offset(skip)
      .getMany()
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        throw err;
      });
  }
}
