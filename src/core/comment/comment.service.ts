import { CommentRepository, SubCommentRepository } from './comment.repository';
import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CommentDto } from './dto/comment.dto';
import { CommentEntity, SubCommentEntity } from './comment.entity';
import { COMMENT_ERROR } from './enum/comment.enum';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { SubCommentDto } from './dto/sub-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    private commentRepository: CommentRepository,
    private subCommentRepository: SubCommentRepository,
  ) {}

  async create(body: CommentDto, userId): Promise<CommentEntity> {
    return await this.commentRepository.save({ ...body, userId });
  }

  async createSub(body: SubCommentDto, userId): Promise<SubCommentEntity> {
    return await this.subCommentRepository.save({ ...body, userId });
  }

  async update(id: string, body: UpdateCommentDto) {
    const result = await this.commentRepository.findOne({
      where: {
        id: id,
        userId: body.userId,
      },
    });
    if (!result) {
      throw new BadRequestException(COMMENT_ERROR.COMMENT_NOT_FOUND);
    } else await this.commentRepository.update(id, body);
    return await this.commentRepository.findOne(id);
  }

  async updateSub(id: string, body: UpdateCommentDto) {
    const result = await this.subCommentRepository.findOne({
      where: {
        id: id,
        userId: body.userId,
      },
    });
    if (!result) {
      throw new BadRequestException(COMMENT_ERROR.COMMENT_NOT_FOUND);
    } else await this.subCommentRepository.update(id, body);
    return await this.subCommentRepository.findOne(id);
  }

  async getAll(postId: string) {
    const results = await this.commentRepository.findAll(postId);
    for (let result of results) {
      const sub = await this.getAllSubs(postId, result.id);
      result.subComment = sub;
    }
    return results;
  }

  async getAllSubs(postId: string, commentId: string) {
    return await this.subCommentRepository.findAll(postId, commentId);
  }

  async getAllUserComments(userId): Promise<CommentEntity[]> {
    return await this.commentRepository.findAllUserComments(userId);
  }

  async getOne(id: string) {
    const result = await this.commentRepository.findOneComment(id);
    const sub = await this.subCommentRepository.findAllToOneComment(id);
    result.subComment = sub;
    if (!result) {
      throw new BadRequestException(COMMENT_ERROR.COMMENT_NOT_FOUND);
    } else return result;
  }

  async delete(id: string, userId: number): Promise<void> {
    const result = await this.commentRepository.findOne({
      where: {
        id: id,
        userId: userId,
      },
    });
    if (!result) {
      throw new BadRequestException(COMMENT_ERROR.COMMENT_NOT_FOUND);
    } else await this.commentRepository.delete(id);
  }

  async deleteSub(id: string, body: any): Promise<void> {
    const result = await this.subCommentRepository.findOne({
      where: {
        id: id,
        userId: body.userId,
      },
    });
    if (!result) {
      throw new BadRequestException(COMMENT_ERROR.COMMENT_NOT_FOUND);
    } else await this.subCommentRepository.delete(id);
  }
}
