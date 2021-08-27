import { FileUploadModule } from './../file-upload/file-upload.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramRepository } from './program.repository';
import { ProgramService } from './program.service';

@Module({
  imports: [FileUploadModule, TypeOrmModule.forFeature([ProgramRepository])],
  providers: [ProgramService],
  exports: [ProgramService],
})
export class ProgramModule {}
