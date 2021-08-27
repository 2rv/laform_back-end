import { FileUploadModule } from '../file-upload/file-upload.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColorsRepository } from './colors.repository';
import { ColorsService } from './colors.service';

@Module({
  imports: [FileUploadModule, TypeOrmModule.forFeature([ColorsRepository])],
  providers: [ColorsService],
  exports: [ColorsService],
})
export class ColorsModule {}
