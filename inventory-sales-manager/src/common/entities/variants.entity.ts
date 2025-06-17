import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Product } from './products.entity';
import { Color } from './colors.entity';
import { Size } from './sizes.entity';
import { StockMovement } from './stock-movements.entity';
import { PurchaseItem } from './purchase_item.entity';
import { OrderDetails } from './order_details.entity';
import { BatchLot } from './batch_lots.entity';
import { ReturnOrder } from './return_order.entity';


@Entity()
export class Variant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  stock_quantity: number;

  @Column({nullable:true})
  reorder_point: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Product, (product) => product.variants, { eager: false })
  @JoinColumn({name : "product_id"})
  product: Product;

  @ManyToOne(() => Color, (color) => color.variants, { eager: true , nullable: true,cascade: true})
  @JoinColumn({name : "color_id"})
   color: Color;

  @ManyToOne(() => Size, (size) => size.variants, { eager: true , nullable: true ,cascade: true})
  @JoinColumn({name : "size_id"})
  size: Size;

  @OneToMany(() => StockMovement, (sm) => sm.variant)
  stockMovements: StockMovement[];

  @OneToMany(() => PurchaseItem, (item) => item.variant)
  purchaseItems: PurchaseItem[];

  @OneToMany(() => OrderDetails, (od) => od.variant)
  orderDetails: OrderDetails[];

  @OneToMany(() => ReturnOrder, (ro) => ro.variant)
  returnOrders: ReturnOrder[];

  @OneToMany(() => BatchLot, (batch) => batch.variant)
  batchLots: BatchLot[];
}
