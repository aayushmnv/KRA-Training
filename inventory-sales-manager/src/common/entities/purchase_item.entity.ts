import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { PurchaseOrder } from './purchase_order.entity';
import { Variant } from './variants.entity';


@Entity()
export class PurchaseItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  unit_price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Variant, (variant) => variant.purchaseItems, { eager: true })
  @JoinColumn({name:'variant_id'}) 
  variant: Variant;

  @ManyToOne(() => PurchaseOrder, (po) => po.items , { eager: false })
  @JoinColumn({name:"purchase_order_id"})
  purchase_order: PurchaseOrder;
}
