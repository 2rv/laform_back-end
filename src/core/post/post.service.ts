import { PostEntity } from './post.entity';
import { Injectable } from '@nestjs/common';
import { PostDto } from './dto/post.dto';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(private postRepository: PostRepository) {}

  async create(body: PostDto): Promise<PostEntity> {
    body.vendorCode = PostEntity.getVendorCode();
    return await this.postRepository.save(body);
  }

  async getAll(
    query: string,
    size: number,
    page: number,
    sort: string,
    by: string,
    where: string,
    category: string,
  ): Promise<PostEntity[]> {
    if (sort === 'title') {
      if (query === 'ru') {
        sort = 'post.titleRu';
      } else if (query === 'en') {
        sort = 'post.titleEn';
      }
    } else if (sort === 'date') {
      sort = 'post.createdDate';
    } else sort = '';

    if (query === 'ru')
      return await this.postRepository.findAllRu(
        size,
        page,
        sort,
        by,
        where,
        category,
      );
    if (query === 'en')
      return await this.postRepository.findAllEn(
        size,
        page,
        sort,
        by,
        where,
        category,
      );
  }
  async getAllAuth(
    query: string,
    size: number,
    page: number,
    sort: string,
    by: string,
    where: string,
    category: string,
    userId: number,
  ): Promise<PostEntity[]> {
    if (sort === 'title') {
      if (query === 'ru') {
        sort = 'post.titleRu';
      } else if (query === 'en') {
        sort = 'post.titleEn';
      }
    } else if (sort === 'date') {
      sort = 'post.createdDate';
    } else sort = '';

    if (query === 'ru')
      return await this.postRepository.findAllRuAuth(
        size,
        page,
        sort,
        by,
        where,
        category,
        userId,
      );
    if (query === 'en')
      return await this.postRepository.findAllEnAuth(
        size,
        page,
        sort,
        by,
        where,
        category,
        userId,
      );
  }

  async getOne(id: string, query: string): Promise<PostEntity> {
    if (query === 'ru') return await this.postRepository.findOneRu(id);
    if (query === 'en') return await this.postRepository.findOneEn(id);
  }
  async getOneAuth(
    id: string,
    query: string,
    userId: number,
  ): Promise<PostEntity> {
    if (query === 'ru')
      return await this.postRepository.findOneRuAuth(id, userId);
    if (query === 'en')
      return await this.postRepository.findOneEnAuth(id, userId);
  }

  async getPinned(query: string): Promise<PostEntity[]> {
    if (query === 'ru') return await this.postRepository.findPinnedRu();
    if (query === 'en') return await this.postRepository.findPinnedEn();
  }
  async getPinnedAuth(query: string, userId: number): Promise<PostEntity[]> {
    if (query === 'ru')
      return await this.postRepository.findPinnedRuAuth(userId);
    if (query === 'en')
      return await this.postRepository.findPinnedEnAuth(userId);
  }

  async getLiked(userId: number, query: string): Promise<PostEntity[]> {
    if (query === 'ru') return await this.postRepository.findLikedRu(userId);
    if (query === 'en') return await this.postRepository.findLikedEn(userId);
  }

  async update(id: string, body: PostDto) {
    const post = await this.postRepository.findOneOrFail(id);
    return await this.postRepository.update(post.id, body);
  }
  async delete(id: string) {
    const post = await this.postRepository.findOneOrFail(id);
    return await this.postRepository.delete(post.id);
  }
}
