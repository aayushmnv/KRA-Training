import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order-entity';
import { OrderItem } from './entities/order-item-entity';

@Module({
  imports: [
   TypeOrmModule.forRoot({
         type: 'postgres',
         host: 'localhost',
         port: 5432,
         username: 'postgres',     
         password: 'Aayush1209',
         database: 's-market',    
         entities: [Order,OrderItem],
         synchronize: true,
       }),
       TypeOrmModule.forFeature([Order,OrderItem]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
