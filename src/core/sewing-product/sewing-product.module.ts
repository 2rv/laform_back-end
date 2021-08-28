import { FileUploadModule } from '../file-upload/file-upload.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SewingProductController } from './sewing-product.controller';
import { SewingProductService } from './sewing-product.service';
import { SewingProductRepository } from './sewing-product.repository';
import { SizesModule } from '../sizes/sizes.module';
import { ColorsModule } from '../colors/colors.module';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [
    FileUploadModule,
    SizesModule,
    ColorsModule,
    CategoryModule,
    TypeOrmModule.forFeature([SewingProductRepository]),
  ],
  providers: [SewingProductService],
  exports: [SewingProductService],
  controllers: [SewingProductController],
})
export class SewingProductModule {}
