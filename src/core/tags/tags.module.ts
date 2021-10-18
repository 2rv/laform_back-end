import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './tags.controller';
import { CategoryService } from './tags.service';
import { CategoryRepository } from './tags.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryRepository])],
  providers: [CategoryService],
  exports: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
