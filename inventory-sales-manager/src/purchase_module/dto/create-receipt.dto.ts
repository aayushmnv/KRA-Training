import { IsDateString, IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateReceiptDto {
  @IsInt()
  purchase_order_id: number;

  @IsDateString()
  received_date: string;

  @IsString()
  @IsNotEmpty()
  quality_checks: string;

  @IsInt()
  supplier_id: number;
}
