import { Column, CreateDateColumn, Entity, EntityMetadata, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./users.entity";
import { PurchaseItem } from "./purchase_item.entity";
import { SupplierPayment } from "./supplier-payment.entities";
import { Receipt } from "./receipts.entity";

@Entity()
export class PurchaseOrder {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => User, (user) => user.purchase_orders, { eager: true })
  @JoinColumn({ name: 'supplier_id' })
  supplier: User;

  @Column()
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => PurchaseItem, (item) => item.purchase_order)
  items: PurchaseItem[];

  @OneToMany(() => SupplierPayment, (payment) => payment.purchaseOrder)
  payments: SupplierPayment[];

  @OneToMany(() => Receipt, (receipt) => receipt.purchaseOrder)
  receipts: Receipt[];
}
