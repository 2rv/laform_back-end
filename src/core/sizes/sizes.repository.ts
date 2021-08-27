import { SizesEntity } from './sizes.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(SizesEntity)
export class SizesRepository extends Repository<SizesEntity> {}
