import { ColorsEntity } from './colors.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(ColorsEntity)
export class ColorsRepository extends Repository<ColorsEntity> {}
