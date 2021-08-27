import { ProgramEntity } from './program-entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(ProgramEntity)
export class ProgramRepository extends Repository<ProgramEntity> {}
