import { IsNumber, IsOptional, IsString } from "class-validator";



type VariantInput = {
    size: string;
    color: string;
    stock_quantity: number;
};

export class CreateProductDto {

    @IsString()
    title: string;

    @IsString()
    description: string;


    @IsString()
    category: string;

    @IsOptional()
    @IsString()
    sub_category?: string;

    @IsOptional()
    @IsString()
    brand?: string;

    @IsOptional()
    @IsString()
    tag?: string;


    @IsNumber()
    unit_price: number;



    variants: VariantInput[];


}