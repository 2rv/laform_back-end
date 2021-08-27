import { FileUploadModule } from '../file-upload/file-upload.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SizesRepository } from './sizes.repository';
import { SizesService } from './sizes.service';

@Module({
  imports: [FileUploadModule, TypeOrmModule.forFeature([SizesRepository])],
  providers: [SizesService],
  exports: [SizesService],
})
export class SizesModule {}
