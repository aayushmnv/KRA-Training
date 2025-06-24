import {
  CreateProductRequest,
  Empty,
  ProductRequest,
  ProductResponse,
  ProductServiceControllerMethods,
  UpdateProductRequest,
} from 'libs/generated/product';
import { Controller } from '@nestjs/common';
import { ProductsService } from './products.service';

@ProductServiceControllerMethods()
@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  getProduct(data: ProductRequest): Promise<ProductResponse> {
    return this.productsService.getProduct(data);
  }

  createProduct(data: CreateProductRequest ): Promise<ProductResponse> {
    return this.productsService.createProduct(data);
  }

  updateProduct(data: UpdateProductRequest ): Promise<Partial<ProductResponse>>  {
    return this.productsService.updateProduct(data);
  }

  deleteProduct(data: ProductRequest){
    return this.productsService.deleteProduct(data);
  }
}
