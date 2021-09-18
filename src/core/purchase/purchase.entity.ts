import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { PurchaseProductEntity } from '../purchase-product/purchase-product.entity';
import { UserEntity } from '../user/user.entity';
import { IsEmail } from 'class-validator';

@Entity({ name: 'purchase' })
export class PurchaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    name: 'created_date',
    readonly: true,
  })
  createdDate: Date;

  //   @Column({                               зачем оно????????????
  //     type: 'varchar',
  //     name: 'order_number',
  //     nullable: true,
  //   })
  //   orderNumber: string;

  //   @Column({                              надо бы это обсудить
  //     type: 'varchar',
  //     name: 'order_status',
  //     nullable: true,
  //   })
  //   orderStatus: string;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.purchase)
  @JoinColumn({
    name: 'user_id',
  })
  userId: UserEntity;

  @Column({
    type: 'varchar',
    name: 'email',
  })
  @IsEmail()
  email!: string;

  @Column({
    type: 'varchar',
    name: 'full_name',
  })
  fullName!: string;

  @Column({
    type: 'varchar',
    name: 'city',
  })
  city!: string;

  @Column({
    type: 'varchar',
    name: 'phone_number',
  })
  phoneNumber!: string;

  //   @Column({                                    надо бы это обсудить
  //     type: 'varchar',
  //     name: 'type_of_payment',
  //   })
  //   typeOfPayment!: string;

  //   @Column({
  //     type: 'varchar',
  //     name: 'type_of_delivery',
  //   })
  //   typeOfDelivery!: string;

  @Column({
    type: 'varchar',
    name: 'comment',
    nullable: true,
  })
  comment?: string;

  @OneToMany(
    () => PurchaseProductEntity,
    (purchaseProduct: PurchaseProductEntity) => purchaseProduct.purchase,
    { cascade: true },
  )
  purchaseProducts: PurchaseProductEntity[];

  //   @Column({                               надо бы это обсудить
  //     type: 'int',
  //     name: 'delivery_price',
  //     nullable: true,
  //   })
  //   deliveryPrice: number;

  @Column({
    type: 'numeric',
    name: 'price',
  })
  price!: number;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  promoCode?: string;

  @Column({
    type: 'int',
    default: 0,
    nullable: true,
  })
  promoCodeDiscount?: number;
}
