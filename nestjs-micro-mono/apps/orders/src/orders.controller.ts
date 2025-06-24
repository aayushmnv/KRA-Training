import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateOrderRequest,
  OrderRequest,
  OrderResponse,
  Empty,
  OrderListResponse,
} from 'libs/generated/order';
import { OrdersService } from './orders.service';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @GrpcMethod('OrderService', 'CreateOrder')
  createOrder(data: CreateOrderRequest): Promise<OrderResponse> {
    return this.ordersService.createOrder(data);
  }

  @GrpcMethod('OrderService', 'GetOrder')
  getOrder(data: OrderRequest): Promise<OrderResponse> {
    return this.ordersService.getOrder(data);
  }

  @GrpcMethod('OrderService', 'ListOrders')
  listOrders(_: Empty): Promise<OrderListResponse> {
    return this.ordersService.listOrders();
  }
}
