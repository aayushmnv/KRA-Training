import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Variant } from './variants.entity';
import { Price } from './prices.entity';
import { Discount } from './discounts.entity';


@Entity()
export class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  category: string;

  @Column()
  sub_category: string;

  @Column({nullable:true})
  brand: string;

  @Column({nullable:true})
  tag: string;

  @Column({unique :true})
  sku : string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;


  @OneToMany(() => Variant, (variant) => variant.product, { eager: true })
  variants: Variant[];


  @OneToMany(() => Price, (price) => price.product ,{ eager: true })
  prices: Price[];


  @OneToMany(() => Discount, (discount) => discount.product)
  discounts: Discount[];
}
