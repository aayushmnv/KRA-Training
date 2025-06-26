import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [ClientsModule.register([
            {
              name:"KAFKA_SERVICE",
              transport:Transport.KAFKA,
              options:{
                client:{
                  brokers:["localhost:9092"]
                }
              }
            }
          ])],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
