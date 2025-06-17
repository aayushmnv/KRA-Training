import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/common/entities/users.entity';
import { SalesOrder } from 'src/common/entities/sales_order.entity';
import { OrderDetails } from 'src/common/entities/order_details.entity';
import { ReturnOrder } from 'src/common/entities/return_order.entity';
import { Refund } from 'src/common/entities/refund.entity';
import { Invoice } from 'src/common/entities/invoice.entity';
import { Payment } from 'src/common/entities/payment.entity';
import { Variant } from 'src/common/entities/variants.entity';
import { Price } from 'src/common/entities/prices.entity';
import { Discount } from 'src/common/entities/discounts.entity';
import { Product } from 'src/common/entities/products.entity';
import { StockMovement } from 'src/common/entities/stock-movements.entity';


@Module({
  imports:[
    TypeOrmModule.forFeature([User,SalesOrder,OrderDetails,ReturnOrder,
      Refund,Invoice,Payment,Variant,
    Price,Discount,Product,StockMovement
    ])
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [CustomerModule]
})
export class CustomerModule {}
