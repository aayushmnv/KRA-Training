import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PRODUCT_PACKAGE_NAME } from 'libs/generated/product'
import { join } from 'path';
import { AppController } from './api-gateway.controller';
import { USER_PACKAGE_NAME } from 'libs/generated/user';
import { ApiProductController } from './api-product.controller';
import { ORDER_PACKAGE_NAME } from '@proto/order';
import { ApiOrdersController } from './api-order.cotroller';
import { AuthController } from './auth/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy';
import { JwtAuthGuard } from './auth/jwt-auth-guard';


@Module({
  imports: [ PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.register({
      secret: 'supersecret',
      signOptions: { expiresIn: '1d' },
    }),
    ClientsModule.register([
      {
        name: "USER_PACKAGE",
        transport: Transport.GRPC,
        options: {
          package: USER_PACKAGE_NAME,
          protoPath: join(process.cwd(), 'proto/user.proto'),
          url : 'localhost:5000'
        },
      },
      {
        name: "PRODUCT_PACKAGE",
        transport:Transport.GRPC,
        options : {
          package : PRODUCT_PACKAGE_NAME,
          protoPath:join (process.cwd(),'proto/product.proto'),
          url:'localhost:5001'
        }
      },
      {
        name: "ORDER_PACKAGE",
        transport:Transport.GRPC,
        options : {
          package : ORDER_PACKAGE_NAME ,
          protoPath:join (process.cwd(),'proto/order.proto'),
          url:'localhost:5002'
        }
      },
      
    ]),
  ],
  controllers: [AppController,ApiProductController,ApiOrdersController,AuthController],
  providers:[JwtStrategy,JwtAuthGuard]
})
export class AppModule {}
