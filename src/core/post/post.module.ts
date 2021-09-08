import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostRepository } from './post.repository';
import { CategoryModule } from '../category/category.module';
import { FileUploadModule } from '../file-upload/file-upload.module';

@Module({
  imports: [
    FileUploadModule,
    CategoryModule,
    TypeOrmModule.forFeature([PostRepository]),
  ],
  providers: [PostService],
  exports: [PostService],
  controllers: [PostController],
})
export class PostModule {}
