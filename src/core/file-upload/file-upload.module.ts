import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from './file-upload.service';
import { FileUploadRepository } from './file-upload.repository';
import { FileUploadEntity } from './file-upload.entity';
import { PurchaseProductRepository } from '../purchase-product/purchase-product.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FileUploadRepository,
      FileUploadEntity,
      PurchaseProductRepository,
    ]),
  ],
  providers: [FileUploadService],
  exports: [FileUploadService],
  controllers: [FileUploadController],
})
export class FileUploadModule {}
