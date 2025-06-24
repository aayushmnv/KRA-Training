import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Post,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  CreateOrderRequest,
  OrderListResponse,
  OrderRequest,
  OrderResponse,
  OrderServiceClient,
} from 'libs/generated/order';

@Controller('orders')
export class ApiOrdersController implements OnModuleInit {
  private orderService: OrderServiceClient ;

  constructor(@Inject('ORDER_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.orderService = this.client.getService<OrderServiceClient>('OrderService');
  }

  @Post()
  createOrder(@Body() body: CreateOrderRequest): Observable<OrderResponse> {
    return this.orderService.createOrder(body);
  }

  @Get(':id')
  getOrder(@Param('id') id: string): Observable<OrderResponse> {
    return this.orderService.getOrder({ id });
  }

  @Get()
  listOrders(): Observable<OrderListResponse> {
    return this.orderService.listOrders({});
  }
}
