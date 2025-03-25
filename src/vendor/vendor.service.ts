import { Injectable } from '@nestjs/common';
import { Vendor } from './schemas/vendor.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class VendorService {
  constructor(@InjectModel(Vendor.name) private customerModel: Model<Vendor>) {}
  async findById(id: string) {
    return this.customerModel.findById(id);
  }
}
