import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { PurchaseProductEntity } from '../purchase-product/purchase-product.entity';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'basket' })
export class BasketEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    name: 'created_date',
    readonly: true,
  })
  createdDate: Date;

  @OneToMany(
    () => PurchaseProductEntity,
    (purchaseProduct: PurchaseProductEntity) => purchaseProduct.basketId,
    {
      cascade: true,
    },
  )
  purchaseProducts: PurchaseProductEntity[];

  @OneToOne(() => UserEntity, (user: UserEntity) => user.basket)
  @JoinColumn({
    name: 'user_id',
  })
  userId: UserEntity;
}
