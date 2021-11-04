import { FileUploadModule } from '../file-upload/file-upload.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LegalInformationRepository } from './legal-information.repository';
import { LegalInformationService } from './legal-information.service';
import { LegalInformationController } from './legal-information.controller';
import { LegalInformationEntity } from './legal-information.entity';

@Module({
  imports: [
    FileUploadModule,
    TypeOrmModule.forFeature([
      LegalInformationRepository,
      LegalInformationEntity,
    ]),
  ],
  providers: [LegalInformationService],
  exports: [LegalInformationService],
  controllers: [LegalInformationController],
})
export class LegalInformationModule {}
