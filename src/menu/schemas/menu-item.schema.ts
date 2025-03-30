import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class MenuItem extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Category',
    required: true,
  })
  categoryId: string;

  @Prop({ required: false })
  image: string;

  @Prop({ default: true })
  isEnabled: boolean;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Vendor', required: true })
  vendorId: string;

  @Prop({ required: false })
  description: string;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const MenuItemSchema = SchemaFactory.createForClass(MenuItem);
