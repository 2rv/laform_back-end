import { FileUploadModule } from '../file-upload/file-upload.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FaqRepository } from './faq.repository';
import { FaqService } from './faq.service';
import { FaqController } from './faq.controller';

@Module({
  imports: [FileUploadModule, TypeOrmModule.forFeature([FaqRepository])],
  providers: [FaqService],
  exports: [FaqService],
  controllers: [FaqController],
})
export class FaqModule {}
