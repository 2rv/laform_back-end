import { FileUploadModule } from './../file-upload/file-upload.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterClassController } from './master-class.controller';
import { MasterClassService } from './master-class.service';
import { MasterClassRepository } from './master-class.repository';
import { ProgramsModule } from '../programs/programs.module';
import { CategoryModule } from '../category/category.module';
import { RecommendationModule } from '../recommendation/recommendation.module';

@Module({
  imports: [
    FileUploadModule,
    ProgramsModule,
    CategoryModule,
    RecommendationModule,
    TypeOrmModule.forFeature([MasterClassRepository]),
  ],
  providers: [MasterClassService],
  exports: [MasterClassService],
  controllers: [MasterClassController],
})
export class MasterClassModule {}
