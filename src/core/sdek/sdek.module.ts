import { Module } from '@nestjs/common';
import { SdekService } from './sdek.service';
import { SdekController } from './sdek.controller';
import { SdekEntity } from './sdek.entity';
import { SdekRepository } from './sdek.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SdekEntity, SdekRepository])],
  providers: [SdekService],
  exports: [SdekService],
  controllers: [SdekController],
})
export class SdekModule {}
