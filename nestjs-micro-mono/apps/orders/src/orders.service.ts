import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order-entity';
import { Repository } from 'typeorm';
import { OrderItem } from './entities/order-item-entity';
import { CreateOrderRequest, OrderListResponse, OrderRequest, OrderResponse } from 'libs/generated/order'

@Injectable()
export class OrdersService {

  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderItem) private orderItemRepo: Repository<OrderItem>
  ) { }


  async createOrder(data: CreateOrderRequest): Promise<OrderResponse> {
    const items = data.products.map(p => {
      const item = new OrderItem();
      item.productId = p.productId;
      item.title = p.title;
      item.price = p.price;
      item.quantity = p.quantity;
      return item;
    });

    const order = this.orderRepo.create({
      userId: data.userId,
      totalAmount: data.totalAmount,
      status: data.status,
      products: items,
    });

    const saved = await this.orderRepo.save(order);
    return saved as unknown as OrderResponse;
  }

  async getOrder(data: OrderRequest): Promise<OrderResponse> {
    const order = await this.orderRepo.findOne({
      where: { id: data.id }
    });

    if (!order) throw new NotFoundException('Order not found');
    return order as unknown as OrderResponse;
  }

  async listOrders(): Promise<OrderListResponse> {
    const orders = await this.orderRepo.find();
    const transformed = orders.map(order => ({
      id: order.id,
      userId: order.userId,
      totalAmount: order.totalAmount,
      status: order.status,
      createdAt: order.createdAt.toISOString(),
      products: order.products.map(product => ({
        id: product.id,
        productId: product.productId,
        title: product.title,
        price: product.price,
        quantity: product.quantity,
      })),
    }));

    return { orders: transformed };
  }


}
