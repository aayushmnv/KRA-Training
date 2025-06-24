import { NestFactory } from '@nestjs/core';
import { ProductsModule } from './products.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { PRODUCT_PACKAGE_NAME } from '@proto/product';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(ProductsModule,{
      transport: Transport.GRPC,
      options: {
        package: PRODUCT_PACKAGE_NAME,
        protoPath: join(process.cwd(), 'proto/product.proto'), 
        url: 'localhost:5001',
      },
    });
  await app.listen();
  console.log("product service running on port 5001")
}
bootstrap();
