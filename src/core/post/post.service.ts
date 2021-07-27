import { PostEntity } from './post.entity';
import { Injectable } from '@nestjs/common';
import { PostDto } from './dto/post.dto';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(private postRepository: PostRepository) {}

  async create(body: PostDto): Promise<PostEntity> {
    return await this.postRepository.save(body);
  }

  async update(id: any, body: any) {
    return await this.postRepository.update(id, body);
  }

  async getOne(id: string, query: string): Promise<PostEntity> {
    if (query === 'ru') {
      return await this.postRepository.findOneRu(id);
    }
    if (query === 'en') {
      return await this.postRepository.findOneEn(id);
    }
  }

  async getAll(
    query: string,
    size: number,
    page: number,
    //sort: string,
    //by: string,
  ): Promise<PostEntity[]> {
    if (query === 'ru') {
      /* if (sort === 'title') {
        sort = 'post.titleRu';
      }
      if (sort === 'category') {
        sort = 'category_id.textRu';
      }
      if (sort === 'date') {
        sort = 'post.createdDate';
      }
      if (sort === 'like') {
        sort = 'post.likeCount';
      } else sort === ''; */
      return await this.postRepository.findAllRu(size, page);
    }
    if (query === 'en') {
      /* if (sort === 'title') {
        sort = 'post.titleEn';
      }
      if (sort === 'category') {
        sort = 'category_id.textEn';
      }
      if (sort === 'date') {
        sort = 'post.createdDate';
      }
      if (sort === 'like') {
        sort = 'post.likeCount';
      } else sort === ''; */
      return await this.postRepository.findAllEn(size, page);
    }
  }

  async getBest(query: string): Promise<PostEntity[]> {
    if (query === 'ru') {
      return await this.postRepository.findBestRu();
    }
    if (query === 'en') {
      return await this.postRepository.findBestEn();
    }
  }

  async getPinned(query: string): Promise<PostEntity[]> {
    if (query === 'ru') {
      return await this.postRepository.findPinnedRu();
    }
    if (query === 'en') {
      return await this.postRepository.findPinnedEn();
    }
  }

  async delete(id: string) {
    return await this.postRepository.delete(id);
  }
}