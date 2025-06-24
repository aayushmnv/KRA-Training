import { NestFactory } from '@nestjs/core';
import { OrdersModule } from './orders.module';
import { ORDER_PACKAGE_NAME } from 'libs/generated/order'
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(OrdersModule,{
        transport: Transport.GRPC,
        options: {
          package: ORDER_PACKAGE_NAME,
          protoPath: join (process.cwd(), 'proto/order.proto'), 
          url: 'localhost:5002',
        },
      });
  await app.listen();
  console.log('order service on 5002');
  
}
bootstrap();
