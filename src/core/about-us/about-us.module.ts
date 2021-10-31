import { FileUploadModule } from '../file-upload/file-upload.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AboutUsRepository } from './about-us.repository';
import { AboutUsService } from './about-us.service';
import { AboutUsController } from './about-us.controller';
import { AboutUsEntity } from './about-us.entity';

@Module({
  imports: [
    FileUploadModule,
    TypeOrmModule.forFeature([AboutUsRepository, AboutUsEntity]),
  ],
  providers: [AboutUsService],
  exports: [AboutUsService],
  controllers: [AboutUsController],
})
export class AboutUsModule {}
