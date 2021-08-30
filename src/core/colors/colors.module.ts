import { FileUploadModule } from '../file-upload/file-upload.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColorsRepository } from './colors.repository';
import { ColorsService } from './colors.service';
import { ColorsController } from './colors.controller';

@Module({
  imports: [FileUploadModule, TypeOrmModule.forFeature([ColorsRepository])],
  providers: [ColorsService],
  exports: [ColorsService],
  controllers: [ColorsController],
})
export class ColorsModule {}