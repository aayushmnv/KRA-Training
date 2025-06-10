import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { PurchaseOrder } from './purchase_order.entity';
import { User } from './users.entity';


@Entity()
export class Receipt {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'date' })
  received_date: string;

  @Column()
  quality_checks: string;

  @ManyToOne(() => PurchaseOrder, (order) => order.receipts, { eager: true })
  purchaseOrder: PurchaseOrder;

  @ManyToOne(() => User, { eager: true })
  supplier: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
