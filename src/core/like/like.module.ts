import { PostModule } from './../post/post.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { LikeRepository } from './like.repository';

@Module({
  imports: [PostModule, TypeOrmModule.forFeature([LikeRepository])],
  providers: [LikeService],
  exports: [LikeService],
  controllers: [LikeController],
})
export class LikeModule {}
