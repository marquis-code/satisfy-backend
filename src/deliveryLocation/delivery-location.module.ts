import { Module } from '@nestjs/common';
import { DeliveryLocationService } from './delivery-location.service';
import { DeliveryLocationController } from './delivery-location.controller';
import {
  DeliveryLocation,
  DeliveryLocationSchema,
} from './schema/delivery-location.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Vendor, VendorSchema } from 'src/vendor/schemas/vendor.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DeliveryLocation.name, schema: DeliveryLocationSchema },
      { name: Vendor.name, schema: VendorSchema },
    ]),
  ],
  controllers: [DeliveryLocationController],
  providers: [DeliveryLocationService],
})
export class UpdatedDeliveryLocationModule {}
