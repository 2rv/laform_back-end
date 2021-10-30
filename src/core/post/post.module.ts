import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostRepository } from './post.repository';
import { FileUploadModule } from '../file-upload/file-upload.module';
import { RecommendationModule } from '../recommendation/recommendation.module';
import { PostEntity } from './post.entity';

@Module({
  imports: [
    FileUploadModule,
    RecommendationModule,
    TypeOrmModule.forFeature([PostRepository, PostEntity]),
  ],
  providers: [PostService],
  exports: [PostService],
  controllers: [PostController],
})
export class PostModule {}
