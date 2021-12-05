import { SdekService } from './../sdek/sdek.service';
import { Module } from '@nestjs/common';

import { PdfController } from './pdf.controller';
import { SdekModule } from '../sdek/sdek.module';

@Module({
  imports: [SdekModule],
  controllers: [PdfController],
})
export class PdfModule {}
