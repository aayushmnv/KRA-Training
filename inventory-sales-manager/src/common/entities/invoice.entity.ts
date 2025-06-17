import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { SalesOrder } from "./sales_order.entity";
import { Payment } from "./payment.entity";

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToOne(() => SalesOrder, (salesOrder) => salesOrder.invoice, { eager: true })
  @JoinColumn({ name: 'sales_order_id' })
  salesOrder: SalesOrder;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  total_amount: number;

  @Column()
  issue_date: Date;

  @Column()
  payment_status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Payment, (payment) => payment.invoice)
  payments: Payment[];


}
