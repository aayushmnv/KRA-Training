import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Variant } from './variants.entity';


@Entity()
export class StockMovement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string; // In or Out

  @Column()
  quantity: number;

  @Column()
  source: string; //  "purchase" ,  "sale" or  "return"

  @Column()
  reference_id: number; // link to purchase/sales/return etc.

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Variant, (variant) => variant.stockMovements, { eager: false })
  variant: Variant;
}
