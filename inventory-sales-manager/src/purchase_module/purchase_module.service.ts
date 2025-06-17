import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchaseItem } from 'src/common/entities/purchase_item.entity';
import { PurchaseOrder } from 'src/common/entities/purchase_order.entity';
import { Receipt } from 'src/common/entities/receipts.entity';
import { SupplierPayment } from 'src/common/entities/supplier-payment.entities';
import { User } from 'src/common/entities/users.entity';
import { Variant } from 'src/common/entities/variants.entity';
import { Repository } from 'typeorm';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { UpdatePurchaseStatusDto } from './dto/update-purchase-status.dto';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { StockMovement } from 'src/common/entities/stock-movements.entity';
import { BatchLot } from 'src/common/entities/batch_lots.entity';

@Injectable()
export class PurchaseModuleService {

    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
        @InjectRepository(Variant) private variantRepo: Repository<Variant>,
        @InjectRepository(PurchaseItem) private purchaseItemRepo: Repository<PurchaseItem>,
        @InjectRepository(PurchaseOrder) private purchaseOrderRepo: Repository<PurchaseOrder>,
        @InjectRepository(Receipt) private receiptRepo: Repository<Receipt>,
        @InjectRepository(SupplierPayment) private supPayRepo: Repository<SupplierPayment>,
        @InjectRepository(StockMovement) private stockMovementRepo: Repository<StockMovement>,
        @InjectRepository(BatchLot) private batchLotRepo: Repository<BatchLot>,

    ) { }

    async createPurchaseOrder(sellerId: number, dto: CreatePurchaseOrderDto) {
        const { supplier_id, items } = dto;

        const supplier = await this.userRepo.findOne({ where: { id: supplier_id } });
        if (!supplier) throw new NotFoundException('Supplier not found');

        const order = this.purchaseOrderRepo.create({
            supplier,
            status: 'pending',
        });
        await this.purchaseOrderRepo.save(order);

        const savedItems = await Promise.all(
            items.map(async (item) => {
                const purchaseItem = this.purchaseItemRepo.create({
                    variant: { id: item.variant_id } as Variant,
                    quantity: item.quantity,
                    unit_price: item.unit_price,
                    purchase_order: order,
                });
                return this.purchaseItemRepo.save(purchaseItem);
            })
        );

        await Promise.all(
            savedItems.map((item) => {
                return this.stockMovementRepo.save({
                    type: 'in',
                    source: 'purchase_order',
                    quantity: item.quantity,
                    reference_id: item.id,
                    variant: { id: item.variant.id } as Variant
                });
            })
        );

        return { message: 'Purchase order created', order_id: order.id };
    }


    async updateOrderStatus(orderId: number, supplierId: number, dto: UpdatePurchaseStatusDto) {
        const order = await this.purchaseOrderRepo.findOne({
            where: { id: orderId },
            relations: ['supplier', 'items'],
        });

        // console.log(supplierId)

        if (!order) throw new NotFoundException('Purchase order not found');
        if (order.supplier.id !== supplierId) throw new ForbiddenException('Not your order');

        order.status = dto.status;
        await this.purchaseOrderRepo.save(order);


        if (dto.status === 'completed') {
            const totalAmount = order.items.reduce((sum, item) => {
                return sum + item.quantity * item.unit_price;
            }, 0);

            const payment = this.supPayRepo.create({
                purchaseOrder: { id: order.id } as PurchaseOrder,
                amount: totalAmount,
                status: 'pending',
                method: "",
                time: new Date().toISOString(),
            });

            await this.supPayRepo.save(payment);

            const purchaseItems = await this.purchaseItemRepo.find({
                where: { purchase_order: { id: order.id } },
                relations: ['variant'],
            });
            console.log(purchaseItems)
            const batchLots = await Promise.all(
                purchaseItems.map(async (item) => {
                    const batchLot = this.batchLotRepo.create({
                        lot_no: Math.floor(Math.random() * 10000000),
                        quantity: item.quantity,
                        variant: item.variant,
                        created_at: new Date(),
                        expiry_date: new Date(new Date().setFullYear(new Date().getFullYear() + 2)), // +2 years
                    });

                    return this.batchLotRepo.save(batchLot);
                })
            );

            console.log("Batch lots created:", batchLots);
        }

        return { message: `Order status updated to ${dto.status}` };
    }

    async createReceipt(dto: CreateReceiptDto) {
        const { purchase_order_id, received_date, quality_checks, supplier_id } = dto;

        const order = await this.purchaseOrderRepo.findOne({
            where: { id: purchase_order_id },
            relations: ['supplier'],
        });

        if (!order) throw new NotFoundException('Purchase Order not found');

        if (order.status !== 'completed') throw new ForbiddenException("Order Items are not received")

        if (order.supplier.id !== supplier_id)
            throw new ForbiddenException('Purchase order and supplier are different');

        const supplier = await this.userRepo.findOne({ where: { id: supplier_id } });
        if (!supplier) throw new NotFoundException('Supplier not found');

        const receipt = this.receiptRepo.create({
            purchaseOrder: order,
            supplier,
            received_date,
            quality_checks,
        });

        await this.receiptRepo.save(receipt);

        return { message: 'Receipt recorded successfully' };
    }

    async paySupplier(orderId: number, method: string) {
        const payment = await this.supPayRepo.findOne({
            where: {
                purchaseOrder: { id: orderId },
                status: 'pending',
            },
            relations: ['purchaseOrder'],
        });

        if (!payment) throw new NotFoundException('No pending payment found for this order');

        payment.status = 'completed';
        payment.method = method;
        payment.time = new Date().toISOString()

        await this.supPayRepo.save(payment);

        return { message: 'Payment completed for supplier', payment_id: payment.id };
    }

    // async getAllPendingPayments() {
    //   return this.supPayRepo.find({
    //     where: { status: 'pending' },
    //     relations: ['purchaseOrder'],
    //   });
    // }

    async getAllPayments(status?: string) {
        if (status) {
            return this.supPayRepo.find({
                where: { status: status },
                relations: ['purchaseOrder'],
            });
        }

        return this.supPayRepo.find({
            relations: ['purchaseOrder'],
        });
    }

    // async getAllPayments (){
    //     return this.supPayRepo.find({
    //     relations: ['purchaseOrder']
    //   });
    // }




}
