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
import { CategoryEntity } from '../category/category.entity';
import { PurchaseProductEntity } from '../purchase-product/purchase-product.entity';
import { UserEntity } from '../user/user.entity';
import { IsEmail } from 'class-validator';

@Entity({ name: 'purchase' })
export class PurchaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    name: 'price',
  })
  price!: string;

  @Column({
    type: 'varchar',
    name: 'discount',
    nullable: true,
  })
  discount?: string;

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
    name: 'type_of_delivery',
  })
  typeOfDelivery!: string;

  @Column({
    type: 'varchar',
    name: 'city',
  })
  city!: string;

  @Column({
    type: 'int',
    name: 'phone_number',
  })
  phoneNumber!: number;

  @Column({
    type: 'varchar',
    name: 'type_of_payment',
  })
  typeOfPayment!: string;

  @Column({
    type: 'varchar',
    name: 'comment',
    nullable: true,
  })
  comment?: string;

  @CreateDateColumn({
    name: 'created_date',
    readonly: true,
  })
  createdDate: Date;

  @OneToMany(
    () => PurchaseProductEntity,
    (purchaseProduct: PurchaseProductEntity) => purchaseProduct.purchase,
    {
      cascade: true,
    },
  )
  purchaseProducts: PurchaseProductEntity[];

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.purchase)
  @JoinColumn({
    name: 'user_id',
  })
  userId: UserEntity;
}
