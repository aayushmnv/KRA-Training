import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from 'src/common/entities/invoice.entity';
import { OrderDetails } from 'src/common/entities/order_details.entity';
import { Payment } from 'src/common/entities/payment.entity';
import { Refund } from 'src/common/entities/refund.entity';
import { ReturnOrder } from 'src/common/entities/return_order.entity';
import { SalesOrder } from 'src/common/entities/sales_order.entity';
import { User } from 'src/common/entities/users.entity';
import { Variant } from 'src/common/entities/variants.entity';
import { Repository } from 'typeorm';
import { CreateSalesOrderDto } from './dto/create-sales-order.dto';
import { Price } from 'src/common/entities/prices.entity';
import { Discount } from 'src/common/entities/discounts.entity';
import { Product } from 'src/common/entities/products.entity';
import { CreateReturnOrderDto } from './dto/create-return-order.dto';
import { UpdateReturnStatusDto } from './dto/update-return-status.dto';
import { StockMovement } from 'src/common/entities/stock-movements.entity';
import { PaymentDto } from './dto/payment.dto';


@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
        @InjectRepository(SalesOrder) private orderRepo: Repository<SalesOrder>,
        @InjectRepository(OrderDetails) private ordDetailsRepo: Repository<OrderDetails>,
        @InjectRepository(Invoice) private invoiceRepo: Repository<Invoice>,
        @InjectRepository(Payment) private paymentRepo: Repository<Payment>,
        @InjectRepository(ReturnOrder) private returnRepo: Repository<ReturnOrder>,
        @InjectRepository(Refund) private refundRepo: Repository<Refund>,
        @InjectRepository(Variant) private variantRepo: Repository<Variant>,
        @InjectRepository(Price) private priceRepo: Repository<Price>,
        @InjectRepository(Product) private productRepo: Repository<Product>,
        @InjectRepository(Discount) private discountRepo: Repository<Discount>,
        @InjectRepository(StockMovement) private stockRepo: Repository<StockMovement>,

    ) { }

    async createSalesOrder(customerId: number, dto: CreateSalesOrderDto) {

        const { items } = dto

        const customer = await this.userRepo.findOne(
            {
                where: {
                    id: customerId
                }
            }
        )

        // console.log("customer from service ",customer);

        if (!customer) throw new NotFoundException('Customer not found , Please try again login')

        const order = this.orderRepo.create({
            customer,
            status: "placed"
        })




        await this.orderRepo.save(order)
        // console.log("sales order => " ,order);

        let total_amount = 0;

        let orderDetails: OrderDetails[] = [];

        for (const item of dto.items) {
            const variant = await this.variantRepo.findOne({
                where: { id: item.variant_id },
                relations: ['product'],
            });

            if (!variant) throw new NotFoundException('Variant of this product not found')

            const price = await this.priceRepo.findOne({ where: { product: { id: variant?.product.id } } });

            //   console.log("Price",price)

            const discount = await this.discountRepo.findOne({
                where: { product: { id: variant?.product.id } }
            })

            //   console.log("discount of product ",discount);

            if (!price) throw new NotFoundException('Price not found')

            const finalPrice = discount
                ? price.amount - (price.amount * discount.discount_percentage) / 100
                : price.amount;

            total_amount += finalPrice * item.quantity;

            const orderDetail = this.ordDetailsRepo.create({
                sales_order: order,
                variant: { id: variant?.id },
                quantity: item.quantity,
                unit_price: finalPrice,
            });

            // console.log("Order detail=>",orderDetail)

            orderDetails.push(orderDetail);


            variant.stock_quantity = variant.stock_quantity - item.quantity
            await this.variantRepo.save(variant)


        }



        await this.ordDetailsRepo.save(orderDetails)
        // console.log("array of order_details:> " , orderDetails)

        const invoice = this.invoiceRepo.create({
            salesOrder: order,
            total_amount: total_amount,
            issue_date: new Date(),
            payment_status: 'pending',
        });

        await this.invoiceRepo.save(invoice);
        //   console.log("invoive = > " , invoice);

        return { message: 'Order placed successfully', order_id: order.id, invoice_id: invoice.id };

    }

    async createReturnOrder(customerId: number, dto: CreateReturnOrderDto) {
        const { sales_order_id, variant_id, quantity, reason, type } = dto;

        const salesOrder = await this.orderRepo.findOne({
            where: { id: sales_order_id },
            relations: ['customer'],
        });

        if (!salesOrder || salesOrder.customer.id !== customerId) {
            throw new ForbiddenException('Invalid sales order access');
        }

        const variant = await this.variantRepo.findOne({ where: { id: variant_id } });
        if (!variant) throw new NotFoundException('Variant not found');

        const returnOrder = this.returnRepo.create({
            type,
            salesOrder,
            variant,
            quantity,
            reason,
            status: 'pending',
        });
        await this.returnRepo.save(returnOrder);

        return { message: 'Return request created', return_order_id: returnOrder.id };
    }

    async approveReturnRequest(dto: UpdateReturnStatusDto) {

        const { returnId, status } = dto

        const returnOrder = await this.returnRepo.findOne({
            where: { id: returnId },
            relations: ['variant', 'salesOrder']
        })

        const variant_id = await this.variantRepo.findOne({
            where: { id: returnOrder?.variant.id },
            relations: ["product"]
        })


        const price = variant_id?.product.prices[0].amount



        if (!returnOrder) throw new ForbiddenException('Return order not found')

        returnOrder.status = status;

        await this.returnRepo.save(returnOrder)

        if (status === 'accepted') {

            returnOrder.salesOrder.status = "returned";
            await this.orderRepo.save(returnOrder.salesOrder);


            const refund = this.refundRepo.create({
                returnOrder,
                refund_amount: Number(returnOrder.quantity) * (price || 0),
                status: 'completed',
                issued_at: new Date(),
            });
            await this.refundRepo.save(refund);

            returnOrder.variant.stock_quantity += Number(returnOrder.quantity);
            await this.variantRepo.save(returnOrder.variant);


            const stockIn = this.stockRepo.create({
                type: 'return_in',
                quantity: Number(returnOrder.quantity),
                source: 'return_order',
                reference_id: returnOrder.id,
                variant: returnOrder.variant,
            });
            await this.stockRepo.save(stockIn);

            return { message: 'Return approved and refund processed' };

        }

        return { message: 'Return req rejected successfully' };


    }


    async createPayment(customerId: number, dto: PaymentDto) {

        const { invoiceId, method } = dto

        const invoice = await this.invoiceRepo.findOne({
            where: { id: invoiceId },
            relations: ["salesOrder"]
        })

        //  console.log(invoice?.salesOrder.customer.id);


        if (!invoice || invoice.salesOrder.customer.id !== customerId) throw new ForbiddenException(`cant make payment with ${invoiceId}, Not available`)

        if (method === "credit") {
            if (invoice.salesOrder.customer.credit_limit < invoice.total_amount) {
                throw new ForbiddenException('Your credit limit is too low to make payment')
            }
        }

        // console.log(invoice.salesOrder.customer.credit_limit)
        const payment = this.paymentRepo.create({
            payment_amount: invoice.total_amount,
            method: method,
            status: 'done',
            invoice,
            updated_at: new Date

        })
        await this.paymentRepo.save(payment)

        invoice.payment_status = "done"

        await this.invoiceRepo.save(invoice)

        return { message: `payment of ${invoice.total_amount} is done` }
    }

    async updateSalesOrderStatus(orderId: number) {

        const order = await this.orderRepo.findOne({ where: { id: orderId } })

        if (!order) throw new NotFoundException(`Order id:${orderId} not found`)

        const invoice = await this.invoiceRepo.findOne({
            where: { id: orderId }
        })

        if (!invoice || invoice.payment_status !== 'done') throw new ForbiddenException('Payment not completed yet or invoice is not generated')


        order.status = 'completed'

        await this.orderRepo.save(order)

        return { message: `Order status has been updated to completed` }
    }

    async getAllSalesOrder() {
        const orders = await this.orderRepo.find({
            relations: ['orderDetails', 'invoice', 'returnOrders']
        })

        const allOrder = orders.map(order => {
            if (order.customer) {
                const { password,gst_no,role,created_at,updated_at, ...rest } = order.customer;
                order.customer = rest as User;
            }
            return order;
        });

        return allOrder;

    }


}
/**{"id":6,"name":"custo mera","email":"customera@gmail.com","contact_no":"91798778789","gst_no":null,"credit_limit":2000,"role":{"id":2,"name":"customer","permissions":[{"id":2,"name":"read-product"},{"id":12,"name":"is-customer"}]}
 * ,"created_at":"2025-06-12T04:44:24.704Z","updated_at":"2025-06-13T05:52:35.977Z"} */
/**if (order.customer) {
  order.customer.password = undefined;
} */




