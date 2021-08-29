import { FileUploadModule } from '../file-upload/file-upload.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatternProductController } from './pattern-product.controller';
import { PatternProductService } from './pattern-product.service';
import { PatternProductRepository } from './pattern-product.repository';
import { SizesModule } from '../sizes/sizes.module';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [
    FileUploadModule,
    SizesModule,
    CategoryModule,
    TypeOrmModule.forFeature([PatternProductRepository]),
  ],
  providers: [PatternProductService],
  exports: [PatternProductService],
  controllers: [PatternProductController],
})
export class PatternProductModule {}
