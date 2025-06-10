import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from "./roles.entity";
import { Address } from "./addresses.entity";
import { SalesOrder } from "./sales_order.entity";
import { PurchaseOrder } from "./purchase_order.entity";
import { Receipt } from "./receipts.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column()
    password: string;

    @Column()
    contact_no: string;

    @Column({ nullable: true })
    gst_no: string;

    @ManyToOne(() => Role, (role) => role.users, { eager: true })
    @JoinColumn({ name: 'role_id' })
    role: Role;

    @OneToMany(() => Address, (address) => address.user, { cascade: true })
    addresses: Address[];

    @OneToMany(() => SalesOrder, (so => so.customer))
    salesOrders: SalesOrder[]

    @OneToMany(() => PurchaseOrder, (po) => po.supplier)
    purchase_orders: PurchaseOrder

    @OneToMany(() => Receipt, (receipt) => receipt.supplier)
    receipts: Receipt[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
