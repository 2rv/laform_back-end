import { FileUploadModule } from '../file-upload/file-upload.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrivacyPolicyRepository } from './privacy-policy.repository';
import { PrivacyPolicyService } from './privacy-policy.service';
import { PrivacyPolicyController } from './privacy-policy.controller';
import { PrivacyPolicyEntity } from './privacy-policy.entity';

@Module({
  imports: [
    FileUploadModule,
    TypeOrmModule.forFeature([PrivacyPolicyRepository, PrivacyPolicyEntity]),
  ],
  providers: [PrivacyPolicyService],
  exports: [PrivacyPolicyService],
  controllers: [PrivacyPolicyController],
})
export class PrivacyPolicyModule {}
