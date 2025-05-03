// // delivery-location.service.ts
// import {
//     Injectable,
//     NotFoundException,
//     BadRequestException,
//     ConflictException,
//   } from '@nestjs/common';
//   import { InjectModel } from '@nestjs/mongoose';
//   import { Model, Types } from 'mongoose';
//   import { DeliveryLocation } from './schema/delivery-location.schema';
//   import { Vendor } from '../vendor/schemas/vendor.schema';
//   import { CreateDeliveryLocationDto } from './dto/delivery-location.dto';
//   import { UpdateDeliveryLocationDto } from './dto/delivery-location.dto';
  
//   // Define an interface for a populated vendor document
//   interface PopulatedVendor extends Omit<Vendor, 'deliveryLocation'> {
//     deliveryLocation: DeliveryLocation[];
//   }
  
//   @Injectable()
//   export class DeliveryLocationService {
//     constructor(
//       @InjectModel(DeliveryLocation.name) 
//       private deliveryLocationModel: Model<DeliveryLocation>,
//       @InjectModel(Vendor.name) 
//       private vendorModel: Model<Vendor>,
//     ) {}
  
//     async create(vendorId: string, createDto: CreateDeliveryLocationDto): Promise<DeliveryLocation> {
//       const vendor = await this.vendorModel.findById(vendorId);
//       if (!vendor) {
//         throw new NotFoundException('Vendor not found');
//       }
  
//       // Check if a delivery location with the same name already exists for this vendor
//       const existingLocations = await this.vendorModel
//         .findById(vendorId)
//         .populate('deliveryLocation')
//         .exec() as unknown as PopulatedVendor;
      
//       // Now we can safely use the populated array
//       const locationExists = existingLocations.deliveryLocation.some(
//         (loc) => loc.name === createDto.name && !loc.isDeleted
//       );
  
//       if (locationExists) {
//         throw new ConflictException(`Delivery location with name ${createDto.name} already exists`);
//       }
  
//       // Create new delivery location
//       const newLocation = new this.deliveryLocationModel(createDto);
//       const savedLocation = await newLocation.save();
  
//       // Add to vendor's delivery locations
//       await this.vendorModel.findByIdAndUpdate(
//         vendorId,
//         { $push: { deliveryLocation: savedLocation._id } },
//         { new: true }
//       );
  
//       return savedLocation;
//     }
  
//     async findAllForVendor(vendorId: string): Promise<DeliveryLocation[]> {
//       const vendor = await this.vendorModel
//         .findById(vendorId)
//         .populate({
//           path: 'deliveryLocation',
//           match: { isDeleted: false }
//         })
//         .exec() as unknown as PopulatedVendor;
  
//       if (!vendor) {
//         throw new NotFoundException('Vendor not found');
//       }
  
//       return vendor.deliveryLocation;
//     }
  
//     async findById(id: string): Promise<DeliveryLocation> {
//       if (!Types.ObjectId.isValid(id)) {
//         throw new BadRequestException('Invalid delivery location ID');
//       }
  
//       const location = await this.deliveryLocationModel.findOne({ 
//         _id: id,
//         isDeleted: false 
//       });
  
//       if (!location) {
//         throw new NotFoundException('Delivery location not found');
//       }
  
//       return location;
//     }
  
//     async update(id: string, updateDto: UpdateDeliveryLocationDto): Promise<DeliveryLocation> {
//       if (!Types.ObjectId.isValid(id)) {
//         throw new BadRequestException('Invalid delivery location ID');
//       }
  
//       const location = await this.deliveryLocationModel.findOneAndUpdate(
//         { _id: id, isDeleted: false },
//         updateDto,
//         { new: true }
//       );
  
//       if (!location) {
//         throw new NotFoundException('Delivery location not found');
//       }
  
//       return location;
//     }
  
//     async delete(vendorId: string, locationId: string): Promise<{ message: string }> {
//       if (!Types.ObjectId.isValid(locationId)) {
//         throw new BadRequestException('Invalid delivery location ID');
//       }
  
//       // First check if this location belongs to the vendor
//       const vendor = await this.vendorModel.findById(vendorId);
//       if (!vendor) {
//         throw new NotFoundException('Vendor not found');
//       }
  
//       // Check if the location ID is in the vendor's delivery locations
//       const locationBelongsToVendor = vendor.deliveryLocation.some(
//         (id) => id.toString() === locationId
//       );
  
//       if (!locationBelongsToVendor) {
//         throw new BadRequestException('Delivery location does not belong to this vendor');
//       }
  
//       // Soft delete by marking as deleted
//       const result = await this.deliveryLocationModel.findByIdAndUpdate(
//         locationId,
//         { isDeleted: true },
//         { new: true }
//       );
  
//       if (!result) {
//         throw new NotFoundException('Delivery location not found');
//       }
  
//       return { message: 'Delivery location deleted successfully' };
//     }
//   }

// delivery-location.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { DeliveryLocation } from './schema/delivery-location.schema';
import { Vendor } from '../vendor/schemas/vendor.schema';
import { CreateDeliveryLocationDto } from './dto/delivery-location.dto';
import { UpdateDeliveryLocationDto } from './dto/delivery-location.dto';

// Define an interface for a populated vendor document
interface PopulatedVendor extends Omit<Vendor, 'deliveryLocation'> {
  deliveryLocation: DeliveryLocation[];
}

@Injectable()
export class DeliveryLocationService {
  constructor(
    @InjectModel(DeliveryLocation.name) 
    private deliveryLocationModel: Model<DeliveryLocation>,
    @InjectModel(Vendor.name) 
    private vendorModel: Model<Vendor>,
  ) {}

  async create(vendorId: string, createDto: CreateDeliveryLocationDto): Promise<DeliveryLocation> {
    const vendor = await this.vendorModel.findById(vendorId);
    if (!vendor) {
      throw new NotFoundException('Vendor not found');
    }

    // Check if a delivery location with the same name already exists for this vendor
    const existingLocations = await this.vendorModel
      .findById(vendorId)
      .populate('deliveryLocation')
      .exec() as unknown as PopulatedVendor;
    
    // Now we can safely use the populated array
    const locationExists = existingLocations.deliveryLocation.some(
      (loc) => loc.name === createDto.name && !loc.isDeleted
    );

    if (locationExists) {
      throw new ConflictException(`Delivery location with name ${createDto.name} already exists`);
    }

    // Create new delivery location with vendorId
    const newLocation = new this.deliveryLocationModel({
      ...createDto,
      vendorId: vendorId  // Add vendorId to the delivery location
    });
    
    const savedLocation = await newLocation.save();

    // Add to vendor's delivery locations
    await this.vendorModel.findByIdAndUpdate(
      vendorId,
      { $push: { deliveryLocation: savedLocation._id } },
      { new: true }
    );

    return savedLocation;
  }

  async findAllForVendor(vendorId: string): Promise<DeliveryLocation[]> {
    const vendor = await this.vendorModel
      .findById(vendorId)
      .populate({
        path: 'deliveryLocation',
        match: { isDeleted: false }
      })
      .exec() as unknown as PopulatedVendor;

    if (!vendor) {
      throw new NotFoundException('Vendor not found');
    }

    return vendor.deliveryLocation;
  }
  
  async findByVendorIdAndName(vendorId: string, name: string): Promise<DeliveryLocation[]> {
    if (!Types.ObjectId.isValid(vendorId)) {
      throw new BadRequestException('Invalid vendor ID');
    }
    
    const vendor = await this.vendorModel
      .findById(vendorId)
      .populate({
        path: 'deliveryLocation',
        match: { 
          name: { $regex: name, $options: 'i' }, // Case-insensitive search
          isDeleted: false 
        }
      })
      .exec() as unknown as PopulatedVendor;

    if (!vendor) {
      throw new NotFoundException('Vendor not found');
    }

    return vendor.deliveryLocation;
  }

  async findById(id: string): Promise<DeliveryLocation> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid delivery location ID');
    }

    const location = await this.deliveryLocationModel.findOne({ 
      _id: id,
      isDeleted: false 
    });

    if (!location) {
      throw new NotFoundException('Delivery location not found');
    }

    return location;
  }

  async update(id: string, updateDto: UpdateDeliveryLocationDto): Promise<DeliveryLocation> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid delivery location ID');
    }

    const location = await this.deliveryLocationModel.findOneAndUpdate(
      { _id: id, isDeleted: false },
      updateDto,
      { new: true }
    );

    if (!location) {
      throw new NotFoundException('Delivery location not found');
    }

    return location;
  }

  async delete(vendorId: string, locationId: string): Promise<{ message: string }> {
    if (!Types.ObjectId.isValid(locationId)) {
      throw new BadRequestException('Invalid delivery location ID');
    }

    // First check if this location belongs to the vendor
    const vendor = await this.vendorModel.findById(vendorId);
    if (!vendor) {
      throw new NotFoundException('Vendor not found');
    }

    // Check if the location ID is in the vendor's delivery locations
    const locationBelongsToVendor = vendor.deliveryLocation.some(
      (id) => id.toString() === locationId
    );

    if (!locationBelongsToVendor) {
      throw new BadRequestException('Delivery location does not belong to this vendor');
    }

    // Soft delete by marking as deleted
    const result = await this.deliveryLocationModel.findByIdAndUpdate(
      locationId,
      { isDeleted: true },
      { new: true }
    );

    if (!result) {
      throw new NotFoundException('Delivery location not found');
    }

    return { message: 'Delivery location deleted successfully' };
  }
}