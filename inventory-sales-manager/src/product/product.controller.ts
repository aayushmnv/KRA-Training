import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { BulkUpdateVariantsDto } from './dto/update-variant.dto';
import { CreateDiscountDto } from './dto/discount-dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { PermissionGuard } from 'src/common/guards/permissions.guard';
import { Permissions } from 'src/common/decorators/permissions.decorator';

@Controller('product')
export class ProductController {

    constructor(private readonly productService: ProductService) { }

    @Post('create')
    createProduct(@Body() createProductDto: CreateProductDto) {
        return this.productService.createProduct(createProductDto)
    }

    @Get()
    getAllProducts(
        @Query('category') category: string,
        @Query('subCategory') subCategory: string,
        @Query('brand') brand: string,
        @Query('minPrice') minPrice: number,
        @Query('maxPrice') maxPrice: number,
        @Query('page') page = 1,
        @Query('limit') limit = 10,
        @Query('sort') sort: 'asc' | 'desc' = 'asc',
        @Query('search') search: string,

    ) {
        

        return this.productService.getAllProducts({ category, subCategory, brand, minPrice, maxPrice, page, limit, sort, search });
    }

    @Get(':id')
    getProductById(@Param('id', ParseIntPipe) id: number) {
        return this.productService.getProductById(id);
    }
    
    @UseGuards(JwtAuthGuard,PermissionGuard)
    @Permissions('is-seller')
    @Patch(':id')
    updateProduct(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDto: UpdateProductDto
    ) {
        return this.productService.updateProduct(id, updateDto);
    }

    
    @UseGuards(JwtAuthGuard,PermissionGuard)
    @Permissions('is-seller')
    @Delete(':id')
    deleteProduct(@Param('id', ParseIntPipe) id: number) {
        return this.productService.deleteProduct(id);
    }
     
    @UseGuards(JwtAuthGuard,PermissionGuard)
    @Permissions('is-seller')
    @Patch('/variants/bulk-update')
    bulkUpdateVariants(@Body() dto: BulkUpdateVariantsDto) {
        return this.productService.bulkUpdateVariants(dto);
    }

    @UseGuards(JwtAuthGuard,PermissionGuard)
    @Permissions('is-seller')
    @Post(':id/discounts')
    addDiscount(
        @Param('id') productId: number,
        @Body() dto: CreateDiscountDto,
    ) {
        return this.productService.addDiscount(productId, dto);
    }




}
