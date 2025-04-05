import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { OrderStatus } from '../order-status.enum';
import { OrderDelivery } from '../order-delivery.enum';

// // order.model.ts
// @Schema({ timestamps: true })
// export class Order extends Document {
//   @Prop({
//     required: true,
//   })
//   orderId: string;
//   @Prop({
//     type: MongooseSchema.Types.ObjectId,
//     ref: 'Customer',
//     required: false,
//   })
//   customerId: string; // Reference to User

//   @Prop({
//     type: MongooseSchema.Types.ObjectId,
//     ref: 'Vendor',
//     required: true,
//   })
//   vendorId: string; // Reference to Vendor

//   @Prop({ required: true })
//   customerName: string;

//   @Prop({ required: true })
//   phoneNumber: string;

//   @Prop({ required: true })
//   location: string;

//   @Prop({ required: false })
//   address: string;

//   // @Prop()
//   // driverId?: string; // Reference to Driver (optional until assigned)

//   @Prop({
//     type: [
//       {
//         menuItemId: { type: MongooseSchema.Types.ObjectId, ref: 'MenuItem' },
//         quantity: Number,
//         price: Number,
//       },
//     ],
//     required: true,
//   })
//   items: { menuItemId: string; quantity: number; price: number }[];

//   @Prop({ required: true })
//   totalAmount: number;

//   @Prop({ default: OrderStatus.PENDING, enum: Object.values(OrderStatus) })
//   status: OrderStatus;

//   @Prop({ required: true, enum: Object.values(OrderDelivery) })
//   deliveryType: OrderDelivery;

//   @Prop({ required: false })
//   notes: string;
//   // @Prop()
//   // deliveredAt?: Date;
// }

// export const OrderSchema = SchemaFactory.createForClass(Order);

// // import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
// // import { Document, Schema as MongooseSchema } from "mongoose"
// // import { OrderStatus } from "../../common/interfaces/order-status.enum"

// // @Schema({ timestamps: true })
// // export class Order extends Document {
// //   @Prop({ type: MongooseSchema.Types.ObjectId, ref: "User", required: true })
// //   userId: string

// //   @Prop({ type: MongooseSchema.Types.ObjectId, ref: "Vendor", required: true })
// //   vendorId: string

// //   @Prop({ required: true })
// //   customerName: string

// //   @Prop({ required: true })
// //   phoneNumber: string

// //   @Prop({ required: true, enum: ["pickup", "delivery"] })
// //   deliveryType: string

// //   @Prop({ required: true })
// //   location: string

// //   @Prop({ required: false })
// //   address: string

// //   @Prop({
// //     type: [
// //       {
// //         menuItemId: { type: MongooseSchema.Types.ObjectId, ref: "MenuItem" },
// //         name: String,
// //         price: Number,
// //         quantity: Number,
// //       },
// //     ],
// //     required: true,
// //   })
// //   items: Array<{
// //     menuItemId: string
// //     name: string
// //     price: number
// //     quantity: number
// //   }>

// //   @Prop({ required: true })
// //   totalAmount: number

// //   @Prop({ default: OrderStatus.PENDING, enum: Object.values(OrderStatus) })
// //   status: OrderStatus

// //   @Prop({ required: false })
// //   notes: string
// // }

// order.schema.ts
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

  @Prop({ required: true })
  location: string;

  @Prop({ required: false })
  address: string;

  @Prop({
    type: [
      {
        packId: String, // Optional pack identifier
        items: [
          {
            menuItemId: {
              type: MongooseSchema.Types.ObjectId,
              ref: 'MenuItem',
            },
            quantity: Number,
            price: Number,
          },
        ],
        quantity: { type: Number, default: 1 }, // Quantity of this pack
      },
    ],
    required: true,
  })
  packs: {
    packId?: string;
    items: { menuItemId: string; quantity: number; price: number }[];
    quantity: number;
  }[];

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ required: true })
  charge: number;

  @Prop({ default: OrderStatus.PENDING, enum: Object.values(OrderStatus) })
  status: OrderStatus;

  @Prop({ required: true, enum: Object.values(OrderDelivery) })
  deliveryType: OrderDelivery;

  @Prop({ required: false })
  notes: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
