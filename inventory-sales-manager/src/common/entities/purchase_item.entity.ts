import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Variant } from './variants.entity';
import { PurchaseOrder } from './purchase_order.entity';


@Entity()
export class PurchaseItem {
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

  @ManyToOne(() => Variant, (variant) => variant.purchaseItems, { eager: true })
  variant: Variant;

  @ManyToOne(() => PurchaseOrder, (po) => po.items , { eager: false })
  purchase_order: PurchaseOrder;
}
