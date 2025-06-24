import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from './order-entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  productId: string; 

  @Column()
  title: string;

  @Column('float')
  price: number; 

  @Column('int')
  quantity: number;

  @ManyToOne(() => Order, order => order.products, { onDelete: 'CASCADE' })
  order: Order;
}
