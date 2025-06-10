import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Variant } from './variants.entity';


@Entity()
export class Size {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Variant, (variant) => variant.size)
  variants: Variant[];
}
