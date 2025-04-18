import { Injectable, NotFoundException } from '@nestjs/common';
import { Vendor } from './schemas/vendor.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class VendorService {
  constructor(@InjectModel(Vendor.name) private vendorModel: Model<Vendor>) {}
  async findById(id: string) {
    return this.vendorModel.findById(id).select('-password');
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

  async findAll() {
    return this.vendorModel.find().select('-password').exec();
  }

  async findVendorBySlug(slug: string) {
    const vendor = await this.vendorModel.findOne({ slug }).select('-password');

    if (!vendor) {
      throw new NotFoundException(`Vendor with slug '${slug}' not found`);
    }

    return {
      _id: vendor._id,
      restaurantName: vendor.restaurantName,
      slug: vendor.slug,
      firstName: vendor.firstName,
      lastName: vendor.lastName,
      description: vendor.description,
      email: vendor.email,
      phoneNumber: vendor.phoneNumber,
      locationName: vendor.locationName,
      address: vendor.address,
      displayImage: vendor.displayImage,
      category: vendor.category,
      isStoreOpen: vendor.isStoreOpen,
    };
  }
}
