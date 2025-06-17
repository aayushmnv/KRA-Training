
import { IsNumber, IsPositive } from 'class-validator';

export class UpdateCreditLimitDto {
  @IsNumber()
  @IsPositive()
  credit_limit: number;
}
