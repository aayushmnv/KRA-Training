import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Variant } from "./variants.entity";

@Entity('batch_lot')
export class BatchLot {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Variant, (variant) => variant.batchLots, { eager: true })
  @JoinColumn({ name: 'variant_id' })
  variant: Variant;

  @Column()
  lot_no: number;

  @Column()
  quantity: number;

  @Column()
  created_at: Date;

  @Column()
  expiry_date: Date;
}
