import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ReturnOrder } from "./return_order.entity";

@Entity()
export class Refund {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToOne(() => ReturnOrder, (returnOrder) => returnOrder.refund, { eager: true })
  @JoinColumn({ name: 'return_order_id' })
  returnOrder: ReturnOrder;

  @Column()
  refund_amount: number;

  @Column()
  status: string;

  @Column()
  issued_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
