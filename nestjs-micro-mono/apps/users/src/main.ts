import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { UserModule } from './users.module';
import { USER_PACKAGE_NAME } from 'libs/generated/user';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(UserModule, {
    transport: Transport.GRPC,
    options: {
      package: USER_PACKAGE_NAME,
      protoPath: join(process.cwd(), 'proto/user.proto'), 
      url: 'localhost:5000',
    },
  });

  await app.listen();
  console.log('user service running on port 5000');
  
}
bootstrap();
