import { IsIn } from "class-validator";

export class UpdatePurchaseStatusDto {
  @IsIn(['completed', 'rejected', 'pending'])
  status: string;
}
