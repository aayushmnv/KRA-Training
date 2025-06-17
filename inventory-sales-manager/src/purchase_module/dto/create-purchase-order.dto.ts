

import { IsArray,  IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class PurchaseItemDto {
  @IsNumber()
  variant_id: number;

  @IsNumber()
  quantity: number;

  @IsNumber()
  unit_price: number;
}

export class CreatePurchaseOrderDto {
  @IsNumber()
  @IsNotEmpty()
  supplier_id: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PurchaseItemDto)
  items: PurchaseItemDto[];
}
