// // // vendor.schema.ts
// // import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// // import { Document, Schema as MongooseSchema, Types } from 'mongoose';

// // @Schema({ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })
// // export class Vendor extends Document {
// //   @Prop({ required: false })
// //   firstName: string;

// //   @Prop({ required: false })
// //   @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'DeliveryLocation' })
// //   deliveryLocation: MongooseSchema.Types.ObjectId;

// //   @Prop({ required: false })
// //   lastName: string;

// //   @Prop({ required: false })
// //   description: string;

// //   @Prop({ required: true })
// //   restaurantName: string;

// //   @Prop({ required: true, unique: true })
// //   slug: string;

// //   @Prop({ required: true, unique: true })
// //   email: string;

// //   @Prop({ required: true })
// //   phoneNumber: string;

// //   @Prop({ required: true })
// //   locationName: string;

// //   @Prop({ required: true })
// //   address: string;

// //   @Prop({ required: false })
// //   displayImage: string;

// //   @Prop({ required: true })
// //   category: string;

// //   @Prop({ required: true })
// //   password: string;

// //   @Prop({ default: true })
// //   isStoreOpen: boolean;

// //   @Prop({
// //     type: {
// //       limit: { type: Number, default: 15, max: 15 },
// //       price: { type: Number, default: 0 }
// //     },
// //     default: {
// //       limit: 10,
// //       price: 0
// //     },
// //     required: false,
// //   })
// //   packSettings: {
// //     limit: number;
// //     price: number;
// //   };

// //   // Keep this field for backward compatibility but don't use it for population
// //   @Prop({
// //     type: [{ type: MongooseSchema.Types.ObjectId, ref: 'DeliveryLocation' }]
// //   })
// //   deliveryLocations: Types.ObjectId;

// //   @Prop({
// //     type: [
// //       {
// //         day: { type: String, required: true },
// //         isActive: { type: Boolean, default: true },
// //         openingTime: { type: String, default: '09:00' },
// //         closingTime: { type: String, default: '17:00' }
// //       }
// //     ],
// //     required: false,
// //     default: [
// //       { day: 'Monday', isActive: true, openingTime: '09:00', closingTime: '17:00' },
// //       { day: 'Tuesday', isActive: true, openingTime: '09:00', closingTime: '17:00' },
// //       { day: 'Wednesday', isActive: true, openingTime: '09:00', closingTime: '17:00' },
// //       { day: 'Thursday', isActive: true, openingTime: '09:00', closingTime: '17:00' },
// //       { day: 'Friday', isActive: true, openingTime: '09:00', closingTime: '17:00' },
// //       { day: 'Saturday', isActive: true, openingTime: '09:00', closingTime: '17:00' },
// //       { day: 'Sunday', isActive: true, openingTime: '09:00', closingTime: '17:00' }
// //     ]
// //   })
// //   workingHours: {
// //     day: string;
// //     isActive: boolean;
// //     openingTime: string;
// //     closingTime: string;
// //   }[];
// // }

// // export const VendorSchema = SchemaFactory.createForClass(Vendor);


// // vendor.schema.ts
// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document, Schema as MongooseSchema, Types } from 'mongoose';

// @Schema({ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })
// export class Vendor extends Document {
//   @Prop({ required: false })
//   firstName: string;

//   @Prop({ required: false })
//   lastName: string;

//   @Prop({ required: false })
//   description: string;

//   @Prop({ required: true })
//   restaurantName: string;

//   @Prop({ required: true, unique: true })
//   slug: string;

//   @Prop({ required: true, unique: true })
//   email: string;

//   @Prop({ required: true })
//   phoneNumber: string;

//   @Prop({ required: true })
//   locationName: string;

//   @Prop({ required: true })
//   address: string;

//   @Prop({ required: false })
//   displayImage: string;

//   @Prop({ required: true })
//   category: string;

//   @Prop({ required: true })
//   password: string;

//   @Prop({ default: true })
//   isStoreOpen: boolean;

//   @Prop({
//     type: {
//       limit: { type: Number, default: 15, max: 15 },
//       price: { type: Number, default: 0 }
//     },
//     default: {
//       limit: 10,
//       price: 0
//     },
//     required: false,
//   })
//   packSettings: {
//     limit: number;
//     price: number;
//   };

//   @Prop({
//     type: [{ type: MongooseSchema.Types.ObjectId, ref: 'DeliveryLocation' }],
//     default: []
//   })
//   deliveryLocation: Types.ObjectId[] | DeliveryLocation[]; // Allow both ObjectId[] and populated DeliveryLocation[]

//   @Prop({
//     type: [
//       {
//         day: { type: String, required: true },
//         isActive: { type: Boolean, default: true },
//         openingTime: { type: String, default: '09:00' },
//         closingTime: { type: String, default: '17:00' }
//       }
//     ],
//     required: false,
//     default: [
//       { day: 'Monday', isActive: true, openingTime: '09:00', closingTime: '17:00' },
//       { day: 'Tuesday', isActive: true, openingTime: '09:00', closingTime: '17:00' },
//       { day: 'Wednesday', isActive: true, openingTime: '09:00', closingTime: '17:00' },
//       { day: 'Thursday', isActive: true, openingTime: '09:00', closingTime: '17:00' },
//       { day: 'Friday', isActive: true, openingTime: '09:00', closingTime: '17:00' },
//       { day: 'Saturday', isActive: true, openingTime: '09:00', closingTime: '17:00' },
//       { day: 'Sunday', isActive: true, openingTime: '09:00', closingTime: '17:00' }
//     ]
//   })
//   workingHours: {
//     day: string;
//     isActive: boolean;
//     openingTime: string;
//     closingTime: string;
//   }[];
// }

// export const VendorSchema = SchemaFactory.createForClass(Vendor);

// vendor.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { DeliveryLocation } from '../../delivery-location/schemas/delivery-location.schema';
import { Review } from 'src/review/schemas/review.schema';

@Schema({ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })
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
      price: { type: Number, default: 0 }
    },
    default: {
      limit: 10,
      price: 0
    },
    required: false,
  })
  packSettings: {
    limit: number;
    price: number;
  };

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'DeliveryLocation' }],
    default: []
  })
  deliveryLocation: Types.ObjectId[] | DeliveryLocation[]; 

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Review' }],
    default: []
  })
  reviews: Types.ObjectId[] | Review[]; 

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
  workingHours: {
    day: string;
    isActive: boolean;
    openingTime: string;
    closingTime: string;
  }[];
}

export const VendorSchema = SchemaFactory.createForClass(Vendor);