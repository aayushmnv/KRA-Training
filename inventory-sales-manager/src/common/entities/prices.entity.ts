import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from './products.entity';


@Entity()
export class Price {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  valid_from: Date;

  @Column()
  valid_to: Date;

  @ManyToOne(() => Product, (product) => product.prices)
  product: Product;
}
