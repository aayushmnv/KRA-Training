import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./users.entity";
import { OrderDetails } from "./order_details.entity";
import { ReturnOrder } from "./return_order.entity";
import { Invoice } from "./invoice.entity";

@Entity('sales_orders')
export class SalesOrder {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => User, (user) => user.salesOrders, { eager: true })
  @JoinColumn({ name: 'customer_id' })
  customer: User;

  @Column()
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => OrderDetails, (od) => od.sales_order)
  orderDetails: OrderDetails[];

  @OneToMany(() => ReturnOrder, (ro) => ro.salesOrder)
  returnOrders: ReturnOrder[];

  @OneToOne(() => Invoice, (inv) => inv.salesOrder, { cascade: true })
  invoice: Invoice;
}
