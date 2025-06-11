import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { Variant } from './variants.entity';


@Entity()
export class StockMovement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string; 

  @Column()
  quantity: number;

  @Column()
  source: string; 

  @Column()
  reference_id: number; 

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Variant, (variant) => variant.stockMovements, { eager: false })
  @JoinColumn({name:"variant_id"})
  variant: Variant;
}
