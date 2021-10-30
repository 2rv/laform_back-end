import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterClassController } from './master-class.controller';
import { MasterClassService } from './master-class.service';
import { MasterClassRepository } from './master-class.repository';
import { RecommendationModule } from '../recommendation/recommendation.module';
import { MasterClassEntity } from './master-class.entity';

@Module({
  imports: [
    RecommendationModule,
    TypeOrmModule.forFeature([MasterClassRepository, MasterClassEntity]),
  ],
  providers: [MasterClassService],
  exports: [MasterClassService],
  controllers: [MasterClassController],
})
export class MasterClassModule {}
