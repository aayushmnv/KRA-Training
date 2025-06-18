import { IsInt, IsOptional, IsString, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';




class VariantUpdateDto {
  @IsInt()
  variantId: number;

  @IsOptional()
  @IsInt()
  stock_quantity?: number;

  @IsOptional()
  @IsString()
  size?: string;

  @IsOptional()
  @IsString()
  color?: string;
}

export class BulkUpdateVariantsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VariantUpdateDto)
  variants: VariantUpdateDto[];
}
