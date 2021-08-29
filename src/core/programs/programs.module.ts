import { FileUploadModule } from '../file-upload/file-upload.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramsRepository } from './programs.repository';
import { ProgramsService } from './programs.service';
import { ProgramsController } from './programs.controller';

@Module({
  imports: [FileUploadModule, TypeOrmModule.forFeature([ProgramsRepository])],
  providers: [ProgramsService],
  exports: [ProgramsService],
  controllers: [ProgramsController],
})
export class ProgramsModule {}
