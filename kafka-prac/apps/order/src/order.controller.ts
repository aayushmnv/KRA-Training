import { Controller, Get, Inject } from '@nestjs/common';
import { OrderService } from './order.service';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService,
     @Inject("KAFKA_SERVICE") private readonly kafkaClient:ClientKafka
  ) {}

  @Get()
  getHello(): string {
    return this.orderService.getHello();
  }

  @MessagePattern("order-created")
  handleOrderCreated(@Payload() order:any){
     console.log('[order-service]:Received new oder:',order);
     

    this.kafkaClient.emit("process-payment",order);

  }
} 
