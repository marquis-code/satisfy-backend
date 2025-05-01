import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { OrderStatus } from '../order-status.enum';
import { OrderDelivery } from '../order-delivery.enum';

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ required: true })
  orderId: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Customer',
    required: false,
  })
  customerId: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Vendor', required: true })
  vendorId: string;

  @Prop({ required: true })
  customerName: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: false })
  location: string;

  @Prop({ required: false })
  address: string;

  @Prop({
    type: [
      {
        items: [
          {
            menuItemId: {
              type: MongooseSchema.Types.ObjectId,
              ref: 'MenuItem',
            },
            name: String, // Add name
            description: String, // Add description
            quantity: Number,
            price: Number,
            image: String, // Add image URL if available
          },
        ],
        quantity: Number,
      },
    ],
    required: true,
  })
  packs: {
    items: {
      menuItemId: string;
      name: string;
      description?: string;
      quantity: number;
      price: number;
      image?: string;
    }[];
    quantity: number;
  }[];
  @Prop({ required: true })
  totalAmount: number;

  @Prop({ required: true })
  charge: number;

  @Prop({ required: false })
  packPrice: number;

  @Prop({ required: false })
  deliveryPrice: number;

  @Prop({ default: OrderStatus.PENDING, enum: Object.values(OrderStatus) })
  status: OrderStatus;

  @Prop({ required: true, enum: Object.values(OrderDelivery) })
  deliveryType: OrderDelivery;

  @Prop({ required: false })
  notes: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
