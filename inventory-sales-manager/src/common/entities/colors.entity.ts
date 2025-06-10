import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Variant } from './variants.entity';


@Entity()
export class Color {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Variant, (variant) => variant.color)
  variants: Variant[];
}
