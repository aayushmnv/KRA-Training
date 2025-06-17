import { IsNotEmpty } from "class-validator";

export class PaymentDto {


  @IsNotEmpty()
  invoiceId: number;

  @IsNotEmpty()
  method: string;


}

