import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/common/entities/products.entity';
import { Size } from 'src/common/entities/sizes.entity';
import { Color } from 'src/common/entities/colors.entity';
import { Price } from 'src/common/entities/prices.entity';
import { Discount } from 'src/common/entities/discounts.entity';
import { Variant } from 'src/common/entities/variants.entity';
import { StockMovement } from 'src/common/entities/stock-movements.entity';

@Module({
  imports :[
    TypeOrmModule.forFeature([Product,Variant,Size,Color,Price,Discount,StockMovement,Discount])
  ] ,
  controllers: [ProductController],
  providers: [ProductService],
  exports:[ProductModule]
})
export class ProductModule {}
