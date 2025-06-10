import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
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
  variant: Variant;

  @ManyToOne(() => SalesOrder, (order) => order.orderDetails, { eager: false })
  sales_order: SalesOrder;
}
