import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class Review extends Document {
  @Prop({ required: true })
  message: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Vendor', required: true })
  vendorId: string;
}
export const ReviewSchema = SchemaFactory.createForClass(Review);
