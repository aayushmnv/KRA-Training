import { Module } from '@nestjs/common';
import { PurchaseModuleController } from './purchase_module.controller';
import { PurchaseModuleService } from './purchase_module.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseOrder } from 'src/common/entities/purchase_order.entity';
import { PurchaseItem } from 'src/common/entities/purchase_item.entity';
import { User } from 'src/common/entities/users.entity';
import { Variant } from 'src/common/entities/variants.entity';
import { SupplierPayment } from 'src/common/entities/supplier-payment.entities';
import { Receipt } from 'src/common/entities/receipts.entity';
import { StockMovement } from 'src/common/entities/stock-movements.entity';
import { BatchLot } from 'src/common/entities/batch_lots.entity';

@Module({
  imports : [
    TypeOrmModule.forFeature([PurchaseOrder,PurchaseItem,User,Variant,SupplierPayment,Receipt,StockMovement,BatchLot])
  ],
  controllers: [PurchaseModuleController],
  providers: [PurchaseModuleService],
  exports    : [PurchaseModuleModule]
})
export class PurchaseModuleModule {}
