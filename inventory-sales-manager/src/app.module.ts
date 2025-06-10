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
import { Variant } from './common/entities/variants.entity';
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

@Module({
  imports: [TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Aayush1209',
      database: 'inventory_sales',
      entities: [User,Role,Address,Permission,
        Product,Price,Variant,Color, Size,Discount,
        BatchLot , Invoice,OrderDetails,SupplierPayment,
        Payment,PurchaseItem,PurchaseOrder,Receipt,Refund,
        ReturnOrder,SalesOrder,StockMovement,],
      autoLoadEntities: true,     
      synchronize: true,  
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
