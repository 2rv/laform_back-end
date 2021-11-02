import { PostEntity } from './post.entity';
import { Injectable } from '@nestjs/common';
import { PostDto } from './dto/post.dto';
import { PostRepository } from './post.repository';
import { FileUploadService } from '../file-upload/file-upload.service';
import { RecommendationService } from '../recommendation/recommendation.service';

@Injectable()
export class PostService {
  constructor(
    private postRepository: PostRepository,
    private fileUploadService: FileUploadService,
    private recommendationService: RecommendationService,
  ) {}

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
    allProductsPage: string,
  ): Promise<[PostEntity[], number]> {
    if (sort === 'title') {
      if (query === 'ru') {
        sort = 'post.titleRu';
      } else if (query === 'en') {
        sort = 'post.titleEn';
      }
    } else if (sort === 'date') {
      sort = 'post.createdDate';
      by = 'ASC';
    } else sort = '';

    if (query === 'ru')
      return await this.postRepository.findAllRu(
        size,
        page,
        sort,
        by,
        where,
        category,
        allProductsPage,
      );
    if (query === 'en')
      return await this.postRepository.findAllEn(
        size,
        page,
        sort,
        by,
        where,
        category,
        allProductsPage,
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
    allProductsPage: string,
    userId: number,
  ): Promise<[PostEntity[], number]> {
    if (sort === 'title') {
      if (query === 'ru') {
        sort = 'post.titleRu';
      } else if (query === 'en') {
        sort = 'post.titleEn';
      }
    } else if (sort === 'date') {
      sort = 'post.createdDate';
      by = 'ASC';
    } else sort = '';

    if (query === 'ru')
      return await this.postRepository.findAllRuAuth(
        size,
        page,
        sort,
        by,
        where,
        category,
        allProductsPage,
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
        allProductsPage,
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

  async getLiked(
    userId: number,
    query: string,
    size: number,
    page: number,
  ): Promise<[PostEntity[], number]> {
    if (query === 'ru')
      return await this.postRepository.findLikedRu(userId, size, page);
    if (query === 'en')
      return await this.postRepository.findLikedEn(userId, size, page);
  }

  async update(id: string, body: PostDto) {
    const post: PostEntity = await this.postRepository.findOneOrFail(id, {
      relations: ['image'],
    });
    if (body.image.id !== post.image.id) {
      await this.fileUploadService.delete(post.image.id);
    }
    if (post.recommendation?.id) {
      await this.recommendationService.delete(post.recommendation.id);
    }
    Object.assign(post, { ...body });
    return await this.postRepository.save(post);
  }

  async updatePinned(id: string, body: any) {
    await this.postRepository.update({ id }, body);
  }

  async delete(id: string) {
    const post = await this.postRepository.findOneOrFail(id);
    return await this.postRepository.delete(post.id);
  }
}
