import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Generated,
} from 'typeorm';
import { PurchaseProductEntity } from '../purchase-product/purchase-product.entity';
import { UserEntity } from '../user/user.entity';
import { IsEmail } from 'class-validator';
import { PURCHASE_STATUS, DELIVERY_TYPE } from './enum/purchase.status';

@Entity({ name: 'purchase' })
export class PurchaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Generated()
  _NID: number;

  static async generateOrderNumber(id: number): Promise<string> {
    const defaultId = '0000000000';
    return defaultId.substring(0, defaultId.length - id.toString().length) + id;
  }

  @Column({
    type: 'varchar',
    nullable: true,
  })
  orderNumber?: string;

  @CreateDateColumn({
    name: 'created_date',
    readonly: true,
  })
  createdDate: Date;

  @Column({
    type: 'enum',
    enum: PURCHASE_STATUS,
    default: PURCHASE_STATUS.CREATED,
    nullable: false,
  })
  orderStatus: PURCHASE_STATUS;

  @Column({
    type: 'enum',
    enum: DELIVERY_TYPE,
    nullable: true,
  })
  deliveryType: DELIVERY_TYPE;

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
    name: 'phone',
  })
  phone!: string;

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

  @Column({
    type: 'bool',
    name: 'sdek',
  })
  sdek!: boolean;

  @Column({
    type: 'int',
    name: 'tariff_code',
    nullable: true,
  })
  sdekTariffCode!: number;

  @Column({
    type: 'int',
    name: 'sdek_city_code',
    nullable: true,
  })
  sdekCityCode!: number;

  @Column({
    type: 'varchar',
    name: 'address',
    nullable: true,
  })
  address!: string;

  @Column({
    type: 'numeric',
    name: 'shipping_price',
    default: 0,
    nullable: true,
  })
  shippingPrice!: number;

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
