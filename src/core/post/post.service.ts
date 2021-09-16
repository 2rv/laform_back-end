import { PostEntity } from './post.entity';
import { Injectable } from '@nestjs/common';
import { PostDto } from './dto/post.dto';
import { PostRepository } from './post.repository';
import { FileUploadService } from '../file-upload/file-upload.service';
import { CategoryService } from '../category/category.service';

@Injectable()
export class PostService {
  constructor(
    private postRepository: PostRepository,
    private fileUploadService: FileUploadService,
    private categoriesService: CategoryService,
  ) {}

  async create(body: PostDto): Promise<PostEntity> {
    await this.categoriesService.createMany(body.categories);
    return await this.postRepository.save(body);
  }

  async update(id: any, body: any) {
    return await this.postRepository.update(id, body);
  }

  async getOne(id: string, query: string): Promise<PostEntity> {
    if (query === 'ru') return await this.postRepository.findOneRu(id);
    if (query === 'en') return await this.postRepository.findOneEn(id);
  }

  async getAll(
    query: string,
    size: number,
    page: number,
  ): Promise<PostEntity[]> {
    if (query === 'ru') return await this.postRepository.findAllRu(size, page);
    if (query === 'en') return await this.postRepository.findAllEn(size, page);
  }

  async getBest(query: string): Promise<PostEntity[]> {
    if (query === 'ru') return await this.postRepository.findBestRu();
    if (query === 'en') return await this.postRepository.findBestEn();
  }

  async getPinned(query: string): Promise<PostEntity[]> {
    if (query === 'ru') return await this.postRepository.findPinnedRu();
    if (query === 'en') return await this.postRepository.findPinnedEn();
  }

  async delete(id: string) {
    const post = await this.postRepository.findOneOrFail(id);
    await this.fileUploadService.deletePost(post.id);
    return await this.postRepository.delete(post.id);
  }
}
