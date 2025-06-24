import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entry';

@Module({
  imports: [TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',     
        password: 'Aayush1209',
        database: 's-market',    
        entities: [Product],
        synchronize: true,
      }),
      TypeOrmModule.forFeature([Product]),],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
