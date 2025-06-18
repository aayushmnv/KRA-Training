import { Type } from "class-transformer";
import { IsArray, isNumber, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";



export class VariantInput  {
    
    @IsString()
    size: string;
    
    @IsString()
    color: string;

    @IsNumber()
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



    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => VariantInput)
    variants: VariantInput[];


}