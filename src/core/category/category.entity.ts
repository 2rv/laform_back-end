import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { MasterClassEntity } from '../master-class/master-class.entity';
import { PatternProductEntity } from '../pattern-product/pattern-product.entity';
import { PostEntity } from '../post/post.entity';
import { SewingProductEntity } from '../sewing-product/sewing-product.entity';

@Entity({ name: 'category' })
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    name: 'category_name_ru',
    unique: true,
  })
  categoryNameRu!: string;

  @Column({
    type: 'varchar',
    name: 'category_name_en',
    nullable: true,
    unique: true,
  })
  categoryNameEn!: string;

  @Column({
    type: 'varchar',
    name: 'type',
  })
  type!: string;

  // @ManyToOne(
  //   () => MasterClassEntity,
  //   (res: MasterClassEntity) => res.categories,
  // )
  // @JoinColumn({
  //   name: 'master_class_id',
  // })
  // masterClassId: MasterClassEntity;

  // @ManyToOne(() => PostEntity, (res: PostEntity) => res.categories)
  // @JoinColumn({
  //   name: 'postId',
  // })
  // postId: PostEntity;

  // @ManyToOne(
  //   () => PatternProductEntity,
  //   (res: PatternProductEntity) => res.categories,
  // )
  // @JoinColumn({
  //   name: 'patternProductId',
  // })
  // patternProductId: PatternProductEntity;

  // @ManyToOne(
  //   () => SewingProductEntity,
  //   (res: SewingProductEntity) => res.categories,
  // )
  // @JoinColumn({
  //   name: 'sewingProductId',
  // })
  // sewingProductId: SewingProductEntity;
}
