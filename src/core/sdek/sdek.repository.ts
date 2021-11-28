import { SdekEntity } from './sdek.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(SdekEntity)
export class SdekRepository extends Repository<SdekEntity> {}
