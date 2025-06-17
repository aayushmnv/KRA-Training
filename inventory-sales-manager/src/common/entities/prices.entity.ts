import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from './products.entity';


@Entity()
export class Price {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable:false})
  amount: number;

  @Column()
  valid_from: Date;

  @Column()
  valid_to: Date;

  @ManyToOne(() => Product, (product) => product.prices)
  @JoinColumn({name:'product_id'})
  product: Product;
}
