// delivery-location.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class DeliveryLocation extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: Number })
  deliveryFee: number;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Vendor' })
  vendorId: MongooseSchema.Types.ObjectId;
}

export const DeliveryLocationSchema = SchemaFactory.createForClass(DeliveryLocation);