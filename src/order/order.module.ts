import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/order.schema';
import { MenuModule } from '../menu/menu.module';
import { VendorModule } from '../vendor/vendor.module';
import { CustomerModule } from '../customer/customer.module';
import { PackModule } from 'src/pack/pack.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    MenuModule,
    VendorModule,
    CustomerModule,
    PackModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
