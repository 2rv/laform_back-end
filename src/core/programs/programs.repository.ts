import { ProgramsEntity } from './programs.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(ProgramsEntity)
export class ProgramsRepository extends Repository<ProgramsEntity> {}
