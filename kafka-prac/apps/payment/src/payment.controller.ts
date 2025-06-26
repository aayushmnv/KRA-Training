import { Controller, Get, Inject } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService,
    @Inject("KAFKA_SERVICE") private readonly kafkaClient:ClientKafka
  ) {}
  
  @Get()
  getHello(): string {
    return this.paymentService.getHello();
  }

  @MessagePattern("process-payment")
  processPayment(@Payload() data:any){
    console.log("[payment service] payment in process",data);
    

    this.kafkaClient.emit("payment-succeed",data);

  }
}
