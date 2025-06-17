import { IsDateString, IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateDiscountDto {
  @IsString()
  @IsNotEmpty()
  discount_name: string;

  @IsNumber()
  @Min(1)
  @Max(100)
  discount_percentage: number;

  @IsDateString()
  valid_from: string;

  @IsDateString()
  valid_to: string;
}
