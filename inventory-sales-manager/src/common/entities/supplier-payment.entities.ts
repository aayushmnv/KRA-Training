import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { PurchaseOrder } from './purchase_order.entity';

@Entity()
export class SupplierPayment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  amount: number;

  @Column({ type: 'date' })
  time: string;

  @Column()
  status: string;

  @Column()
  method: string;

  @ManyToOne(() => PurchaseOrder, (order) => order.payments, { eager: true })
  purchaseOrder: PurchaseOrder;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
