import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import {  CreateProductRequest, ProductRequest, ProductResponse, UpdateProductRequest } from 'libs/generated/product'
import { Product } from './entities/product.entry';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {

  constructor(@InjectRepository(Product) private productRepo :Repository<Product> ){}
   
  async getProduct(data:ProductRequest):Promise<ProductResponse> {
       
    const product = await this.productRepo.findOne({where : {id:data.id}as ProductRequest })

    if(!product) throw new NotFoundException('product not found')
   
      return product ;

  }

  async createProduct(data: CreateProductRequest): Promise<Product> {
  if (data.price === undefined || data.price === null) {
    throw new BadRequestException('Price is required');
  }

  const product = this.productRepo.create(data);
  return this.productRepo.save(product);
}
  async updateProduct(data: UpdateProductRequest): Promise<Partial<ProductResponse>> {
  const product = await this.productRepo.findOne({ where: { id: data.id } });

  if (!product) {
    throw new NotFoundException('Product not found');
  }


  if (data.title !== undefined) {
    product.title = data.title;
  }

  if (data.description !== undefined) {
    product.description = data.description;
  }

  if (data.price !== undefined) {
    product.price = data.price;
  }

  await this.productRepo.save(product);

  return product;
}


async deleteProduct(data : ProductRequest): Promise<void> {
    await this.productRepo.delete(data);
  }
}
