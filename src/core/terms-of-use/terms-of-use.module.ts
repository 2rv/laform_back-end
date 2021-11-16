import { FileUploadModule } from '../file-upload/file-upload.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TermsOfUseRepository } from './terms-of-use.repository';
import { TermsOfUseService } from './terms-of-use.service';
import { TermsOfUseController } from './terms-of-use.controller';
import { TermsOfUseEntity } from './terms-of-use.entity';

@Module({
  imports: [
    FileUploadModule,
    TypeOrmModule.forFeature([TermsOfUseRepository, TermsOfUseEntity]),
  ],
  providers: [TermsOfUseService],
  exports: [TermsOfUseService],
  controllers: [TermsOfUseController],
})
export class TermsOfUseModule {}
