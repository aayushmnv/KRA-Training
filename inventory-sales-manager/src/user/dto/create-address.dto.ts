import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateAddressDto {
  @IsNumber()
  flat_no: number;

  @IsString()
  @IsNotEmpty()
  area: string;

  @IsString()
  @IsOptional()
  street?: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsNumber()
  zip_code: number;

  @IsString()
  @IsOptional()
  landmark?: string;
}
