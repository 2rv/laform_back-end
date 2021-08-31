import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SliderController } from './slider.controller';
import { SliderService } from './slider.service';
import { SliderRepository } from './slider.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SliderRepository])],
  providers: [SliderService],
  exports: [SliderService],
  controllers: [SliderController],
})
export class SliderModule {}
