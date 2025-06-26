import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
          {
            name:"KAFKA_SERVICE",
            transport:Transport.KAFKA,
            options:{
              client:{
                brokers:["localhost:9092"]
              }
            }
          }
        ])
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
