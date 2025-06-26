import { NestFactory } from '@nestjs/core';
import { OrderModule } from './order.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(OrderModule,{
    transport:Transport.KAFKA,
    options:{
      client:{
        brokers:["localhost:9092"]
      },
      consumer:{
        groupId:"payment-succeed"
      }
    }
  });
  await app.listen();
  console.log("Order App listen on kafka...");
  
}
bootstrap();
