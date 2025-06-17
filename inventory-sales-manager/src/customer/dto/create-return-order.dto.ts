


export class CreateReturnOrderDto{

    sales_order_id: number;
    
    variant_id:number
    
    quantity:number;
    
    reason:string;

    type: 'refund' | 'replacement';
}


