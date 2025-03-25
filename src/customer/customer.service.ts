import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Customer } from './schemas/customer.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
  ) {}
  async findById(id: string) {
    return this.customerModel.findById(id);
  }
}
