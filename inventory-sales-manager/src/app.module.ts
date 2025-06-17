import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './common/entities/users.entity';
import { Role } from './common/entities/roles.entity';
import { Address } from './common/entities/addresses.entity';
import { Permission } from './common/entities/permissions.entity';
import { Product } from './common/entities/products.entity';
import { Price } from './common/entities/prices.entity';
import { Color } from './common/entities/colors.entity';
import { Size } from './common/entities/sizes.entity';
import { Discount } from './common/entities/discounts.entity';
import { BatchLot } from './common/entities/batch_lots.entity';
import { Invoice } from './common/entities/invoice.entity';
import { OrderDetails } from './common/entities/order_details.entity';
import { SupplierPayment } from './common/entities/supplier-payment.entities';
import { Payment } from './common/entities/payment.entity';
import { PurchaseItem } from './common/entities/purchase_item.entity';
import { PurchaseOrder } from './common/entities/purchase_order.entity';
import { Receipt } from './common/entities/receipts.entity';
import { Refund } from './common/entities/refund.entity';
import { ReturnOrder } from './common/entities/return_order.entity';
import { SalesOrder } from './common/entities/sales_order.entity';
import { StockMovement } from './common/entities/stock-movements.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { Variant } from './common/entities/variants.entity';
import { PurchaseModuleModule } from './purchase_module/purchase_module.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    })
    , TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
        entities: [User, Role, Address, Permission,
          Product, Price, Variant, Color, Size, Discount,
          BatchLot, Invoice, OrderDetails, SupplierPayment,
          Payment, PurchaseItem, PurchaseOrder, Receipt, Refund,
          ReturnOrder, SalesOrder, StockMovement,]
      }),
    }), AuthModule, ProductModule, UserModule, PurchaseModuleModule, CustomerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
