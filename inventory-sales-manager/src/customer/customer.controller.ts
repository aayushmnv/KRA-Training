import { Body, Controller, Get, NotFoundException, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateSalesOrderDto } from './dto/create-sales-order.dto';
import { currentUser } from 'src/common/decorators/user.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CreateReturnOrderDto } from './dto/create-return-order.dto';
import { PermissionGuard } from 'src/common/guards/permissions.guard';
import { Permissions } from 'src/common/decorators/permissions.decorator';
import { UpdateReturnStatusDto } from './dto/update-return-status.dto';
import { PaymentDto } from './dto/payment.dto';

@Controller('customer')
export class CustomerController {
    constructor(
        private readonly customerService: CustomerService
    ) { }

    @Post('create')
    @UseGuards(JwtAuthGuard)
    createSalesOrder(@currentUser() user: any, @Body() dto: CreateSalesOrderDto) {

        if (!user) throw new NotFoundException('Customer not found , Please try login again')
        // console.log("current user => " ,user);

        return this.customerService.createSalesOrder(user.id, dto)
    }
    @Post('return')
    @UseGuards(JwtAuthGuard)
    createReturnOrder(@currentUser() user: any, @Body() dto: CreateReturnOrderDto) {

        if (!user) throw new NotFoundException('Customer not found ,Please login')
        // console.log("current user => " ,user);

        return this.customerService.createReturnOrder(user.id, dto)
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Permissions('is-seller')
    @Patch('return-status')
    updateReturnStatus(@currentUser() user: any, @Body() dto: UpdateReturnStatusDto) {

        return this.customerService.approveReturnRequest(dto)
    }


    @UseGuards(JwtAuthGuard)
    @Post('payment')
    createPayment(@currentUser() user: any, @Body() dto: PaymentDto) {
        return this.customerService.createPayment(user.id, dto)
    }


    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Permissions('is-seller')
    @Patch('order-status/:id')
    updateOrderStatus(@Param('id') orderId: number) {
        return this.customerService.updateSalesOrderStatus(orderId)
    }

    @Get('orders')
    getAllOrders(){
        return this.customerService.getAllSalesOrder()
    }

}