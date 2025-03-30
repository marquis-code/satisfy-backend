import { Injectable, NotFoundException } from '@nestjs/common';
import { Vendor } from './schemas/vendor.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class VendorService {
  constructor(@InjectModel(Vendor.name) private vendorModel: Model<Vendor>) {}
  async findById(id: string) {
    return this.vendorModel.findById(id);
  }

  async openStore(vendorId: string): Promise<Vendor> {
    const vendor = await this.vendorModel
      .findByIdAndUpdate(vendorId, { isStoreOpen: true }, { new: true })
      .select('-password');

    if (!vendor) {
      throw new NotFoundException('Vendor not found');
    }

    return vendor;
  }

  async closeStore(vendorId: string): Promise<Vendor> {
    const vendor = await this.vendorModel
      .findByIdAndUpdate(vendorId, { isStoreOpen: false }, { new: true })
      .select('-password');

    if (!vendor) {
      throw new NotFoundException('Vendor not found');
    }

    return vendor;
  }
}
