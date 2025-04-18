import { Module } from '@nestjs/common';
import { PackService } from './pack.service';
import { PackController } from './pack.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pack, PackSchema } from './schemas/pack.schema';
import { Vendor, VendorSchema } from 'src/vendor/schemas/vendor.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Pack.name, schema: PackSchema },
      { name: Vendor.name, schema: VendorSchema },
    ]),
  ],
  controllers: [PackController],
  providers: [PackService],
  exports: [PackService],
})
export class PackModule {}
