import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Invoice } from "./invoice.entity";

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  payment_amount: number;

  @Column()
  method: string;

  @Column()
  status: string;

  @ManyToOne(() => Invoice, (invoice) => invoice.payments, { eager: true })
  @JoinColumn({ name: 'invoice_id' })
  invoice: Invoice;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
