import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { PurchaseModuleService } from './purchase_module.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { PermissionGuard } from 'src/common/guards/permissions.guard';
import { currentUser } from 'src/common/decorators/user.decorator';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { UpdatePurchaseStatusDto } from './dto/update-purchase-status.dto';
import { Permissions } from 'src/common/decorators/permissions.decorator';
import { CreateReceiptDto } from './dto/create-receipt.dto';

@Controller('purchase')
export class PurchaseModuleController {
    constructor(
        private readonly purchaseService: PurchaseModuleService,
    ) { }

    @Post()
    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Permissions('is-seller')
    createPurchaseOrder(
        @currentUser('id') sellerId: number,
        @Body() dto: CreatePurchaseOrderDto,
    ) {
        return this.purchaseService.createPurchaseOrder(sellerId, dto);
    }

    @Patch(':id/status')
    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Permissions('is-supplier')
    updateStatus(
        @Param('id', ParseIntPipe) orderId: number,
        @currentUser('id') supplierId: number,
        @Body() dto: UpdatePurchaseStatusDto,
    ) {
        return this.purchaseService.updateOrderStatus(orderId, supplierId, dto);
    }

    @Post('receipt')
    @UseGuards(JwtAuthGuard,PermissionGuard)
    @Permissions('is-seller')
    createReceipt(
        @currentUser('id') sellerId: number,
        @Body() dto: CreateReceiptDto,
    ) {
        return this.purchaseService.createReceipt(dto);
    }

    @Post('payment')
    @UseGuards(JwtAuthGuard,PermissionGuard)
    @Permissions('is-seller')
    paySupplier(
        @Body() body:{orderId:number,method:string},
    ){
        return this.purchaseService.paySupplier(body.orderId ,body.method)
    }


    
        @Get('payment')
        @UseGuards(JwtAuthGuard,PermissionGuard)
        @Permissions('is-seller')
        getAllPay(@Query('status') status?: string) {
            return this.purchaseService.getAllPayments(status);
        }


}
