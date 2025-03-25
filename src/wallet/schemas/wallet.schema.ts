import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class Wallet extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Vendor' })
  vendorId: MongooseSchema.Types.ObjectId;
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Customer' })
  customerId: MongooseSchema.Types.ObjectId;

  @Prop({ default: 0.0 })
  balance: number;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
