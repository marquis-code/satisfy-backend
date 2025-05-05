// First, let's update the Review schema to include rating
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class Review extends Document {
  @Prop({ required: true })
  message: string;

  @Prop({ required: true, min: 1, max: 5 })
  rating: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Vendor', required: true })
  vendorId: string;
  
  @Prop({ default: null })
  customerName: string;
  
  @Prop({ default: null })
  customerId: string;
  
  @Prop({ default: null })
  vendorReply: string;
  
  @Prop({ default: false })
  isDeleted: boolean;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);