import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { LikeRepository } from './like.repository';
import { PostRepository } from './../post/post.repository';
import { MasterClassRepository } from '../master-class/master-class.repository';
import { SewingProductRepository } from '../sewing-product/sewing-product.repository';
import { PatternProductRepository } from '../pattern-product/pattern-product.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PostRepository,
      MasterClassRepository,
      SewingProductRepository,
      PatternProductRepository,
      LikeRepository,
    ]),
  ],
  providers: [LikeService],
  exports: [LikeService],
  controllers: [LikeController],
})
export class LikeModule {}
