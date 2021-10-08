import { LikeRepository } from './like.repository';
import { Injectable, BadRequestException } from '@nestjs/common';
import { MasterClassRepository } from './../master-class/master-class.repository';
import { LIKE_ERROR } from './enum/like.enum';
import { PostRepository } from './../post/post.repository';
import { PatternProductRepository } from '../pattern-product/pattern-product.repository';
import { SewingProductRepository } from '../sewing-product/sewing-product.repository';
import { LikeDto } from './dto/like.dto';
import { LikeEntity } from './like.entity';

@Injectable()
export class LikeService {
  constructor(
    private likeRepository: LikeRepository,
    private postRepository: PostRepository,
    private masterClassRepository: MasterClassRepository,
    private sewingProductRepository: SewingProductRepository,
    private patternProductRepository: PatternProductRepository,
  ) {}

  async create(body: LikeDto, userId) {
    const result = await this.likeRepository.findOne({
      ...body,
      userId: userId,
    });
    if (result) {
      throw new BadRequestException(LIKE_ERROR.LIKE_ALREADY_EXISTS);
    } else await this.likeRepository.save({ ...body, userId: userId });
    // const count = await this.count(body);
    if (body.postId) {
      //   await this.postRepository.update(body.postId, { likeCount: count });
      return { id: body.postId };
    }
    if (body.masterClassId) {
      //   await this.masterClassRepository.update(body.masterClassId, {
      //     likeCount: count,
      //   });
      return { id: body.masterClassId };
    }
    if (body.sewingProductId) {
      //   await this.sewingProductRepository.update(body.sewingProductId, {
      //     likeCount: count,
      //   });
      return { id: body.sewingProductId };
    }
    if (body.patternProductId) {
      //   await this.patternProductRepository.update(body.patternProductId, {
      //     likeCount: count,
      //   });
      return { id: body.patternProductId };
    }
  }

  async getUserLikes(userId: number, query: string): Promise<LikeEntity[]> {
    if (query === 'ru') return await this.likeRepository.getUserLikesRu(userId);
    if (query === 'en') return await this.likeRepository.getUserLikesEn(userId);
  }

  async delete(body: LikeDto, userId) {
    const result = await this.likeRepository.findOne({
      ...body,
      userId: userId,
    });
    if (!result) {
      throw new BadRequestException(LIKE_ERROR.LIKE_NOT_EXISTS);
    } else await this.likeRepository.delete(result.id);
    // const count = await this.count(body);
    if (body.postId) {
      //   await this.postRepository.update(body.postId, { likeCount: count });
      return { id: body.postId };
    }
    if (body.masterClassId) {
      //   await this.masterClassRepository.update(body.masterClassId, {
      //     likeCount: count,
      //   });
      return { id: body.masterClassId };
    }
    if (body.sewingProductId) {
      //   await this.sewingProductRepository.update(body.sewingProductId, {
      //     likeCount: count,
      //   });
      return { id: body.sewingProductId };
    }
    if (body.patternProductId) {
      //   await this.patternProductRepository.update(body.patternProductId, {
      //     likeCount: count,
      //   });
      return { id: body.patternProductId };
    }
  }

  async count(body) {
    return await this.likeRepository.count(body);
  }
}
