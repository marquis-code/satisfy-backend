import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePackDto } from './dto/create-pack.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Vendor } from 'src/vendor/schemas/vendor.schema';
import { Model } from 'mongoose';
import { Pack } from './schemas/pack.schema';

@Injectable()
export class PackService {
  constructor(
    @InjectModel(Vendor.name)
    private vendorModel: Model<Vendor>,
    @InjectModel(Pack.name)
    private packModel: Model<Pack>,
  ) {}
  async addPackPrice(vendorId: string, createDto: CreatePackDto) {
    const { price } = createDto;

    const pack = await this.packModel.create({
      price: price,
      vendorId: vendorId,
    });
    return pack;
  }

  async findPackPriceById(vendorId: string, id: string) {
    const pack = await this.packModel
      .findOne({
        _id: id,
        vendorId: vendorId,
      })
      .exec();

    if (!pack) {
      throw new NotFoundException('Menu Item not found');
    }

    return pack;
  }

  async getVendorPack(vendorId: string) {
    return await this.packModel
      .findOne({
        vendorId,
      })
      .exec();
  }

  async updatePackPrice(
    vendorId: string,
    id: string,
    updatePackDto: CreatePackDto,
  ) {
    await this.findPackPriceById(vendorId, id);

    const updatedLocation = await this.packModel
      .findByIdAndUpdate(id, updatePackDto, {
        new: true,
      })
      .exec();

    return updatedLocation;
  }
}
