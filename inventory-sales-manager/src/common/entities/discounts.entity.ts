import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from './products.entity';


@Entity()
export class Discount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  discount_name: string;

  @Column('float')
  discount_percentage: number;

  @Column()
  valid_from: Date;

  @Column()
  valid_to: Date;

  @ManyToOne(() => Product, (product) => product.discounts)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
