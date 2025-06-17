import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Color } from 'src/common/entities/colors.entity';
import { Price } from 'src/common/entities/prices.entity';
import { Product } from 'src/common/entities/products.entity';
import { Size } from 'src/common/entities/sizes.entity';
import { Like, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Variant } from 'src/common/entities/variants.entity';
import { StockMovement } from 'src/common/entities/stock-movements.entity';
import { UpdateProductDto } from './dto/update-product.dto';
import { BulkUpdateVariantsDto } from './dto/update-variant.dto';
import { CreateDiscountDto } from './dto/discount-dto';
import { Discount } from 'src/common/entities/discounts.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product) private productRepo: Repository<Product>,
        @InjectRepository(Variant) private variantRepo: Repository<Variant>,
        @InjectRepository(Color) private colorRepo: Repository<Color>,
        @InjectRepository(Size) private sizeRepo: Repository<Size>,
        @InjectRepository(Price) private priceRepo: Repository<Price>,
        @InjectRepository(Discount) private discountRepo: Repository<Discount>,
        @InjectRepository(StockMovement) private stockMovementRepo: Repository<StockMovement>
    ) { }

    async createProduct(createProductDto: CreateProductDto) {
        const {
            title,
            description,
            category,
            sub_category,
            tag,
            brand,
            unit_price,
            variants,
        } = createProductDto;


        const sku = await this.generateSKU(category, sub_category, tag, brand);

        const newProduct = this.productRepo.create({
            title, description, category, sub_category, tag, brand, sku,
        });
        const savedProduct = await this.productRepo.save(newProduct);

        const variantEntities: any = [];

        for (const variant of variants) {
            const { size, color, stock_quantity } = variant;

            let colorEntity = await this.colorRepo.findOneBy({ name: color });
            if (!colorEntity) {
                colorEntity = this.colorRepo.create({ name: color });
                colorEntity = await this.colorRepo.save(colorEntity);
            }

            let sizeEntity = await this.sizeRepo.findOneBy({ name: size });
            if (!sizeEntity) {
                sizeEntity = this.sizeRepo.create({ name: size });
                sizeEntity = await this.sizeRepo.save(sizeEntity);
            }
            const variantEntity = this.variantRepo.create({
                stock_quantity,
                product: savedProduct,
                color: colorEntity,
                size: sizeEntity,
            });
            const savedVariant = await this.variantRepo.save(variantEntity);

            await this.stockMovementRepo.save({
                type: 'in',
                source: 'product_creation',
                quantity: savedVariant.stock_quantity,
                variant: { id: savedVariant.id } as Variant,
                reference_id: savedProduct.id
            });
        }

        const priceEntity = this.priceRepo.create({
            product: savedProduct,
            amount: unit_price,
            valid_from: new Date(),
            valid_to: new Date('2099-12-31'),
        });
        await this.priceRepo.save(priceEntity);




        return { message: 'Product created successfully', sku };
    }

    async generateSKU(category: string, subCategory?: string, tag?: string, brand?: string) {

        const sanitize = (str: string) => str.trim().replace(/\s+/g, '').toUpperCase();

        const cat = sanitize(category).slice(0, 3).toUpperCase();
        const subCat = subCategory ? sanitize(subCategory).slice(0, 3) : 'SUB';
        const tagPart = tag ? sanitize(tag).slice(0, 2) : 'TG';
        const brandPart = brand ? sanitize(brand).slice(0, 2) : 'BR';

        const skuPrefix = `${cat}-${subCat}-${tagPart}-${brandPart}`;

        const count = await this.productRepo.count({
            where: { sku: Like(`${skuPrefix}%`) },
        });

        const finalSKU = `${skuPrefix}-${String(count + 1).padStart(4, '0')}`;
        return finalSKU;
    }


    async getAllProducts({
        category,
        subCategory,
        brand,
        minPrice,
        maxPrice,
        page = 1,
        limit = 10,
        sort = 'asc',
        search
    }) {
        const query = this.productRepo
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.variants', 'variant')
            .leftJoinAndSelect('product.prices', 'price');

        if (search) {
            query.andWhere(
                '(product.title ILIKE :search OR product.description ILIKE :search)',
                { search: `%${search}%` },
            );
        }
        if (category) {
            query.andWhere('(product.category ILIKE :category)', { category : `%${category}%` })
        };
        if (subCategory){
             query.andWhere('product.sub_category ILIKE :subCategory', { subCategory :`%${subCategory}%` })
        };
        if (brand) {
            query.andWhere('product.brand ILIKE :brand', { brand : `%${brand}%`})
        };
        if (minPrice) query.andWhere('price.amount >= :minPrice', { minPrice });
        if (maxPrice) query.andWhere('price.amount <= :maxPrice', { maxPrice });



        query.orderBy('product.created_at', sort.toUpperCase() === 'DESC' ? 'DESC' : 'ASC');
        query.skip((page - 1) * limit).take(limit);

        const [products, total] = await query.getManyAndCount();

        return {
            total,
            page,
            limit,
            products
        };
    }

    async getProductById(id: number) {
        const product = await this.productRepo.findOne({
            where: { id },
            relations: ['variants', 'prices', 'discounts'],
        });

        if (!product) throw new NotFoundException('Product not found');


        const currentPrice = product.prices?.[0]?.amount || 0;


        const now = new Date();
        const activeDiscount = product.discounts?.find(
            (d) =>
                new Date(d.valid_from) <= now && new Date(d.valid_to) >= now
        );

        const discountPercentage = activeDiscount?.discount_percentage || 0;
        const discountedPrice = currentPrice - (currentPrice * discountPercentage) / 100;

        return {
            ...product,
            price: currentPrice,
            active_discount: activeDiscount || null,
            discounted_price: Math.round(discountedPrice),
        };
    }


    async updateProduct(id: number, updateDto: UpdateProductDto): Promise<Product> {
        const product = await this.productRepo.findOneBy({ id });

        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }

        const updated = this.productRepo.merge(product, updateDto);
        return await this.productRepo.save(updated);
    }

    async deleteProduct(id: number): Promise<{ message: string }> {
        const product = await this.productRepo.findOneBy({ id });

        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }

        await this.productRepo.remove(product);

        return { message: `Product with ID ${id} deleted successfully.` };
    }

    async bulkUpdateVariants(dto: BulkUpdateVariantsDto) {

        for (const update of dto.variants) {
            const variant = await this.variantRepo.findOne({
                where: { id: update.variantId },
                relations: ['color', 'size'],
            });

            if (!variant) continue;

            if (update.stock_quantity !== undefined) {
                variant.stock_quantity = update.stock_quantity;
            }

            if (update.size) {


                let size = await this.sizeRepo.findOneBy({ name: update.size });
                if (!size) {

                    size = this.sizeRepo.create({ name: update.size });
                    await this.sizeRepo.save(size);
                }

                variant.size = size;
            }

            if (update.color) {

                let color = await this.colorRepo.findOneBy({ name: update.color });
                if (!color) {
                    color = this.colorRepo.create({ name: update.color });

                    await this.colorRepo.save(color);
                }
                variant.color = color;
            }

            await this.variantRepo.save(variant);
        }

        return { message: 'Variants updated successfully' };
    }

    async addDiscount(productId: number, dto: CreateDiscountDto) {
        const product = await this.productRepo.findOneBy({ id: productId });
        if (!product) throw new NotFoundException('Product not found');

        const discount = this.discountRepo.create({
            ...dto,
            valid_from: new Date(dto.valid_from),
            valid_to: new Date(dto.valid_to),
            product,
        });

        await this.discountRepo.save(discount);

        return { message: 'Discount added successfully', discount };
    }
  

    // async getDiscountByVariant(variant_id : number){

    //     const variant = this.variantRepo.findOne({
    //         where : {id:variant_id},
    //         relations : ["product" , "price" , "discount"]
    //     })

    // }
    
    




}


