import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Vendor extends Document {
  @Prop({ required: false })
  firstName: string;

  @Prop({ required: false })
  lastName: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: true })
  restaurantName: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  locationName: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: false })
  displayImage: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: true })
  isStoreOpen: boolean;
}

export const VendorSchema = SchemaFactory.createForClass(Vendor);