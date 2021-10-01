import { PostEntity } from './post.entity';
import { Injectable } from '@nestjs/common';
import { PostDto } from './dto/post.dto';
import { PostRepository } from './post.repository';
import { FileUploadService } from '../file-upload/file-upload.service';

@Injectable()
export class PostService {
  constructor(
    private postRepository: PostRepository,
    private fileUploadService: FileUploadService,
  ) {}

  async create(body: PostDto): Promise<PostEntity> {
    return await this.postRepository.save(body);
  }

  async getAll(
    query: string,
    size: number,
    page: number,
    sort: string,
    by: string,
    where: string,
  ): Promise<[PostEntity[], number]> {
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
      return await this.postRepository.findAllRu(size, page, sort, by, where);
    if (query === 'en')
      return await this.postRepository.findAllEn(size, page, sort, by, where);
  }
  async getAllAuth(
    query: string,
    size: number,
    page: number,
    sort: string,
    by: string,
    where: string,
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
    } else sort = '';

    if (query === 'ru')
      return await this.postRepository.findAllRuAuth(
        size,
        page,
        sort,
        by,
        where,
        userId,
      );
    if (query === 'en')
      return await this.postRepository.findAllEnAuth(
        size,
        page,
        sort,
        by,
        where,
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

  async delete(id: string) {
    const post = await this.postRepository.findOneOrFail(id);
    await this.fileUploadService.deletePost(post.id);
    return await this.postRepository.delete(post.id);
  }
  async update(id: any, body: any) {
    return await this.postRepository.update(id, body);
  }
}
