import { LikeEntity } from './like.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(LikeEntity)
export class LikeRepository extends Repository<LikeEntity> {}
