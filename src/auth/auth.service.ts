// import { Injectable, UnauthorizedException, BadRequestException } from "@nestjs/common"
// import type { JwtService } from "@nestjs/jwt"
import * as bcrypt from 'bcrypt';
// import type { UserService } from "../user/user.service"
// import type { VendorService } from "../vendor/vendor.service"
// import type { WalletService } from "../wallet/wallet.service"
// import type { CustomerSignupDto } from "./dto/customer-signup.dto"
// import type { CustomerLoginDto } from "./dto/customer-login.dto"
// import type { VendorSignupDto } from "./dto/vendor-signup.dto"
// import type { VendorLoginDto } from "./dto/vendor-login.dto"
// import { UserRole } from "../common/interfaces/user-role.enum"

import { InjectModel } from '@nestjs/mongoose';
import { Vendor } from '../vendor/schemas/vendor.schema';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { VendorSignupDto } from './dto/vendor-signup.dto';
import { Wallet } from '../wallet/schemas/wallet.schema';
import { CustomerSignupDto } from './dto/customer-signup.dto';
import { Customer } from '../customer/schemas/customer.schema';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private jwtService: JwtService,
    // private userService: UserService,
    // private vendorService: VendorService,
    // private walletService: WalletService,
    @InjectModel(Vendor.name) private vendorModel: Model<Vendor>,
    @InjectModel(Wallet.name) private walletModel: Model<Wallet>,
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
  ) {}

  async customerSignup(customerSignupDto: CustomerSignupDto) {
    const { fullName, email, phoneNumber, locationName, password } =
      customerSignupDto;
    // Check if user already exists
    const existingUser = await this.customerModel.findOne({
      $or: [{ email }, { phoneNumber }],
    });

    if (existingUser) {
      // Customize error message based on which field conflicted
      if (existingUser.email === email) {
        throw new BadRequestException(
          'Customer with this email already exists',
        );
      } else {
        throw new BadRequestException(
          'Customer with this phone number already exists',
        );
      }
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await this.customerModel.create({
      email,
      fullName,
      phoneNumber,
      locationName,
      password: hashedPassword,
    });

    // Create wallet for the user
    await this.walletModel.create({ customerId: newUser._id });
    this.logger.log(
      `Auth-Service-- Customer Account with ${newUser.email} created successfully`,
    );
    return {
      message: 'Customer created successfully',
      customer: {
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        locationName: newUser.locationName,
        status: newUser.status,
      },
    };
  }

  async customerLogin(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const customer = await this.customerModel.findOne({
      email,
    });
    if (!customer) {
      throw new BadRequestException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, customer.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    const token = this.generateToken(
      customer._id.toString(),
      customer.email,
      'customer',
    );

    this.logger.log(
      `Auth-Service-- Customer Account with ${customer.email} logged in successfully`,
    );
    return {
      customer: {
        _id: customer._id,
        fullName: customer.fullName,
        email: customer.email,
        phoneNumber: customer.phoneNumber,
        locationName: customer.locationName,
        status: customer.status,
      },
      token,
    };
  }

  async vendorSignup(vendorSignupDto: VendorSignupDto) {
    const {
      restaurantName,
      email,
      phoneNumber,
      locationName,
      address,
      displayImage,
      category,
      password,
    } = vendorSignupDto;
    
    // Check if vendor already exists
    const existingUser = await this.vendorModel.findOne({
      $or: [{ email }, { phoneNumber }],
    });
  
    if (existingUser) {
      // Customize error message based on which field conflicted
      if (existingUser.email === email) {
        throw new BadRequestException('Vendor with this email already exists');
      } else {
        throw new BadRequestException(
          'Vendor with this phone number already exists',
        );
      }
    }
  
    // Generate slug from restaurant name
    let slug = this.generateSlug(restaurantName);
    
    // Check if slug already exists and make it unique if needed
    let slugExists = await this.vendorModel.findOne({ slug });
    let counter = 1;
    
    while (slugExists) {
      slug = this.generateSlug(restaurantName) + '-' + counter;
      slugExists = await this.vendorModel.findOne({ slug });
      counter++;
    }
  
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Create vendor
    const newVendor = await this.vendorModel.create({
      restaurantName,
      slug,
      email,
      phoneNumber,
      locationName,
      address,
      displayImage,
      category,
      password: hashedPassword,
    });
  
    // Create wallet for the vendor
    await this.walletModel.create({ vendorId: newVendor._id });
  
    this.logger.log(
      `Auth-Service-- Vendor Account with ${newVendor.email} created successfully`,
    );
  
    return {
      message: 'Vendor created successfully',
      vendor: {
        _id: newVendor._id,
        restaurantName: newVendor.restaurantName,
        slug: newVendor.slug,
        email: newVendor.email,
        phoneNumber: newVendor.phoneNumber,
        locationName: newVendor.locationName,
        address: newVendor.address,
        displayImage: displayImage,
        isStoreOpen: newVendor.isStoreOpen,
        workingHours: newVendor.workingHours,
        packSettings: newVendor.packSettings
      },
    };
  }
  
  // Helper method to generate slug from restaurant name
  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters except whitespace and hyphens
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Remove multiple hyphens
      .trim(); // Trim whitespace from start and end
  }

  async vendorLogin(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const vendor = await this.vendorModel.findOne({
      email,
    });
    if (!vendor) {
      throw new BadRequestException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, vendor.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    const token = this.generateToken(
      vendor._id.toString(),
      vendor.email,
      'vendor',
    );
    this.logger.log(
      `Auth-Service-- Vendor Account with ${vendor.email} logged in successfully`,
    );
    return {
      vendor: {
        _id: vendor._id,
        restaurantName: vendor.restaurantName,
        email: vendor.email,
        phoneNumber: vendor.phoneNumber,
        locationName: vendor.locationName,
        workingHours: vendor.workingHours,
        packSettings: vendor.packSettings
      },
      token,
    };
  }

  private generateToken(userId: string, email: string, type: string) {
    const payload = { sub: userId, email, type };
    return this.jwtService.sign(payload);
  }
}
