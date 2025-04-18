import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class Pack extends Document {
  @Prop({ required: false })
  price: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Vendor', required: true })
  vendorId: string;
}
export const PackSchema = SchemaFactory.createForClass(Pack);
