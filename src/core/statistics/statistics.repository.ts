import { StatisticsEntity } from './statistics.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(StatisticsEntity)
export class StatisticsRepository extends Repository<StatisticsEntity> {}
