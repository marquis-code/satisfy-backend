import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDeliveryLocationDto } from './dto/create-delivery-location.dto';
import { InjectModel } from '@nestjs/mongoose';
import { DeliveryLocation } from './schemas/delivery-location.schema';
import { Model } from 'mongoose';
import { Vendor } from 'src/vendor/schemas/vendor.schema';
import { UpdateDeliveryLocationDto } from './dto/update-delivery-location.dto';

@Injectable()
export class DeliveryLocationService {
  constructor(
    @InjectModel(DeliveryLocation.name)
    private locationModel: Model<DeliveryLocation>,
    @InjectModel(Vendor.name)
    private vendorModel: Model<Vendor>,
  ) {}

  async addDeliveryLocation(
    vendorId: string,
    createDto: CreateDeliveryLocationDto,
  ) {
    const { name, deliveryFee } = createDto;

    const existingLocation = await this.locationModel.findOne({
      name: name,
      vendorId: vendorId,
      isDeleted: false,
    });

    if (existingLocation) {
      throw new ConflictException(
        'Delivery Location with this name already exists',
      );
    }
    const newLocation = await this.locationModel.create({
      name: name,
      deliveryFee: deliveryFee,
      vendorId: vendorId,
    });
    return newLocation;
  }

  async getDeliveryLocation(vendorId: string) {
    return this.locationModel
      .find({
        vendorId,
        isDeleted: false,
      })
      .exec();
  }

  async getDeliveryLocationByVendor(vendorId: string) {
    const vendor = await this.vendorModel.findOne({
      _id: vendorId,
    });

    if (!vendor) {
      throw new NotFoundException('Vendor not found');
    }
    return this.locationModel
      .find({
        vendorId,
        isDeleted: false,
      })
      .exec();
  }

  async findDeliveryLocationById(vendorId: string, id: string) {
    const location = await this.locationModel
      .findOne({
        _id: id,
        vendorId: vendorId,
        isDeleted: false,
      })
      .exec();

    if (!location) {
      throw new NotFoundException('Menu Item not found');
    }

    return location;
  }

  async updateDelieveryLocation(
    vendorId: string,
    id: string,
    updateLocationDto: UpdateDeliveryLocationDto,
  ) {
    await this.findDeliveryLocationById(vendorId, id);

    const updatedLocation = await this.locationModel
      .findByIdAndUpdate(id, updateLocationDto, {
        new: true,
      })
      .exec();

    return updatedLocation;
  }

  async deleteDeliveryLocation(vendorId: string, id: string) {
    await this.findDeliveryLocationById(vendorId, id);

    const deletedMenuItem = await this.locationModel
      .findByIdAndUpdate(
        id,
        { isDeleted: true },
        {
          new: true,
        },
      )
      .exec();

    return deletedMenuItem;
  }
}
