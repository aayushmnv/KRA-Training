import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { Variant } from './variants.entity';
import { SalesOrder } from './sales_order.entity';


@Entity()
export class OrderDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  unit_price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Variant, (variant) => variant.orderDetails, { eager: true })
  @JoinColumn({name : "variant_id"})
  variant: Variant;

  @ManyToOne(() => SalesOrder, (order) => order.orderDetails, { eager: false })
  @JoinColumn({name:"sales_order_id"})
  sales_order: SalesOrder;
}
