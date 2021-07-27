import { PostService } from './../post/post.service';
import { LikeRepository } from './like.repository';
import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { LikeEntity } from './like.entity';
import { LIKE_ERROR } from './enum/like.enum';

@Injectable()
export class LikeService {
  constructor(
    private likeRepository: LikeRepository,
    private postService: PostService,
  ) {}

  async create(body: LikeEntity, userId: any) {
    const result = await this.likeRepository.findOne({
      postId: body.postId,
      userId: userId,
    });
    if (result) {
      throw new BadRequestException(LIKE_ERROR.LIKE_ALREADY_EXISTS);
    } else await this.likeRepository.save({ ...body, userId: userId });
    const count = await this.count(body);
    await this.postService.update(body.postId, { likeCount: count });
    return { like: count };
  }

  async getPosts(userId: any) {
    return await this.likeRepository.find({
      where: {
        userId: userId,
      },
      relations: ['postId'],
    });
  }

  async delete(body: LikeEntity, userId: any) {
    const result = await this.likeRepository.findOne({
      postId: body.postId,
      userId: userId,
    });
    if (!result) {
      throw new BadRequestException(LIKE_ERROR.LIKE_NOT_EXISTS);
    } else await this.likeRepository.delete(result.id);
    const count = await this.count(body);
    await this.postService.update(body.postId, { likeCount: count });
    return { like: count };
  }

  async count(body: LikeEntity) {
    return await this.likeRepository.count({
      where: {
        postId: body.postId,
      },
    });
  }
}
