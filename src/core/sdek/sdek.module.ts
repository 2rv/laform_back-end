import { Module } from '@nestjs/common';
import { SdekService } from './sdek.service';
import { SdekController } from './sdek.controller';

@Module({
  providers: [SdekService],
  exports: [SdekService],
  controllers: [SdekController],
})
export class SdekModule {}
