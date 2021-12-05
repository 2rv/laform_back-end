import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FaqSizeRepository } from './faq-size.repository';
import { FaqSizeService } from './faq-size.service';
import { FaqSizeController } from './faq-size.controller';
import { FaqSizeEntity } from './faq-size.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FaqSizeRepository, FaqSizeEntity])],
  providers: [FaqSizeService],
  exports: [FaqSizeService],
  controllers: [FaqSizeController],
})
export class FaqSizeModule {}
