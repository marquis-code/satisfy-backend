// delivery-location.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class DeliveryLocation extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: Number })
  deliveryFee: number;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const DeliveryLocationSchema = SchemaFactory.createForClass(DeliveryLocation);