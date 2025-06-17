import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { SalesOrder } from "./sales_order.entity";
import { Variant } from "./variants.entity";
import { Refund } from "./refund.entity";

@Entity()
export class ReturnOrder {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  type: string;

  @ManyToOne(() => SalesOrder, (salesOrder) => salesOrder.returnOrders, { eager: true })
  @JoinColumn({ name: 'sales_order_id' })
  salesOrder: SalesOrder;

  @ManyToOne(() => Variant, (variant) => variant.returnOrders, { eager: true })
  @JoinColumn({ name: 'variant_id' })
  variant: Variant;

  @Column()
  quantity: number;

  @Column()
  reason: string;

  @Column()
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => Refund, (refund) => refund.returnOrder)
  refund: Refund;
}
