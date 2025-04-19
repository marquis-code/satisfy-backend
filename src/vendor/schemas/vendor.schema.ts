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

  @Prop({
    type: {
      limit: { type: Number, default: 15, max: 15 },
      number: { type: Number, default: 0 }
    },
    default: {
      limit: 10,
      number: 0
    },
    required: false,
  })
  packSettings?: {
    limit: number;
    number: number;
  };

  @Prop({
    type: [
      {
        day: { type: String, required: true },
        isActive: { type: Boolean, default: true },
        openingTime: { type: String, default: '09:00' },
        closingTime: { type: String, default: '17:00' }
      }
    ],
    required: false,
    default: [
      { day: 'Monday', isActive: true, openingTime: '09:00', closingTime: '17:00' },
      { day: 'Tuesday', isActive: true, openingTime: '09:00', closingTime: '17:00' },
      { day: 'Wednesday', isActive: true, openingTime: '09:00', closingTime: '17:00' },
      { day: 'Thursday', isActive: true, openingTime: '09:00', closingTime: '17:00' },
      { day: 'Friday', isActive: true, openingTime: '09:00', closingTime: '17:00' },
      { day: 'Saturday', isActive: true, openingTime: '09:00', closingTime: '17:00' },
      { day: 'Sunday', isActive: true, openingTime: '09:00', closingTime: '17:00' }
    ]
  })
  workingHours?: {
    day: string;
    isActive: boolean;
    openingTime: string;
    closingTime: string;
  }[];
}

export const VendorSchema = SchemaFactory.createForClass(Vendor);
