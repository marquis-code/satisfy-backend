import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Customer } from './schemas/customer.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Wallet } from '../wallet/schemas/wallet.schema';
import { ChangePasswordDto } from './dto/change-password.dto';
import * as bcrypt from 'bcrypt';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
    @InjectModel(Wallet.name) private walletModel: Model<Wallet>,
  ) {}
  async findById(id: string) {
    return this.customerModel.findById(id);
  }

  async getProfile(userId: string) {
    const user = await this.customerModel
      .findById(userId)
      .select('-password')
      .exec();
    if (!user || user.isDeleted) {
      throw new NotFoundException('User not found');
    }
    const wallet = await this.walletModel.findOne({ customerId: user._id });

    return { user, wallet };
  }

  async changePassword(userId: string, changePasswordDto: ChangePasswordDto) {
    const user = await this.customerModel.findById(userId).select('+password');
    if (!user || user.isDeleted) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(
      changePasswordDto.currentPassword,
      user.password,
    );
    if (!isPasswordValid) {
      throw new NotFoundException('Current password is incorrect');
    }

    const hashedPassword = await bcrypt.hash(changePasswordDto.newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return { message: 'Password changed successfully' };
  }

  async deactivateAccount(userId: string) {
    const user = await this.customerModel.findByIdAndUpdate(userId, {
      status: 'inactive',
    });

    if (!user || user.isDeleted) {
      throw new NotFoundException('User not found');
    }

    return { message: 'Account deactivated successfully' };
  }

  async activateAccount(userId: string) {
    const user = await this.customerModel.findByIdAndUpdate(userId, {
      status: 'active',
    });

    if (!user || user.isDeleted) {
      throw new NotFoundException('User not found');
    }

    return { message: 'Account activated successfully' };
  }

  async updateProfile(userId: string, updateUserDto: UpdateCustomerDto) {
    const user = await this.customerModel
      .findByIdAndUpdate(userId, updateUserDto, { new: true })
      .select('-password')
      .exec();

    if (!user || user.isDeleted) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async fetchCustomerWallet(userId: string) {
    const user = await this.customerModel.findById(userId);
    if (!user || user.isDeleted) {
      throw new NotFoundException('User not found');
    }

    const wallet = await this.walletModel.findOne({ customerId: user._id });

    return wallet;
  }

  async deleteAccount(userId: string): Promise<{ message: string }> {
    const user = await this.customerModel.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true },
    );

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return { message: 'Account deleted successfully' };
  }
}
