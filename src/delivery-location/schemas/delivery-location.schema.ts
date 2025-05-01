import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class DeliveryLocation extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: false })
  deliveryFee: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Vendor', required: true })
  vendorId: string;

  @Prop({ default: false })
  isDeleted: boolean;
}
export const DeliveryLocationSchema =
  SchemaFactory.createForClass(DeliveryLocation);

  // Add this to ensure virtuals are included
DeliveryLocationSchema.set('toJSON', { virtuals: true });
DeliveryLocationSchema.set('toObject', { virtuals: true });