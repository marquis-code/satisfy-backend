import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './schemas/order.schema';
import mongoose, { FilterQuery, Model } from 'mongoose';
import { MenuService } from '../menu/menu.service';
import { VendorService } from '../vendor/vendor.service';
// import { WalletService } from '../wallet/wallet.service';
import { OrderStatus } from './order-status.enum';
import { CustomerService } from '../customer/customer.service';
import { customAlphabet } from 'nanoid';
import { UpdateOrderStatusDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    // private walletService: WalletService,
    private menuService: MenuService,
    private vendorService: VendorService,
    private customerService: CustomerService,
  ) {}
  // async create(
  //   // userId: string,
  //   createOrderDto: CreateOrderDto,
  // ) {
  //   // const customer = await this.customerService.findById(userId);
  //   // Verify vendor exists and store is open
  //   const vendor = await this.vendorService.findById(createOrderDto.vendorId);
  //   if (!vendor) {
  //     throw new NotFoundException('Vendor not found');
  //   }
  //   if (!vendor.isStoreOpen) {
  //     throw new BadRequestException('Vendor store is currently closed');
  //   }

  //   // Calculate total amount
  //   let totalAmount = 0;
  //   for (const item of createOrderDto.items) {
  //     const menuItem = await this.menuService.findOne(item.menuItemId);
  //     if (!menuItem) {
  //       throw new NotFoundException(`Menu item ${item.menuItemId} not found`);
  //     }
  //     if (!menuItem.isEnabled) {
  //       throw new BadRequestException(
  //         `Menu item ${menuItem.name} is not available`,
  //       );
  //     }
  //     totalAmount += menuItem.price * item.quantity;
  //   }

  //   const alphabet =
  //     '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  //   const generateId = customAlphabet(alphabet, 12);

  //   // Create order
  //   const order = new this.orderModel({
  //     orderId: `ST-${generateId()}`,
  //     // customerId: userId,
  //     vendorId: createOrderDto.vendorId,
  //     customerName: createOrderDto.customerName,
  //     phoneNumber: createOrderDto.phoneNumber,
  //     deliveryType: createOrderDto.deliveryType,
  //     location: createOrderDto.location,
  //     address: createOrderDto.address,
  //     items: createOrderDto.items,
  //     totalAmount,
  //     status: OrderStatus.PENDING,
  //     notes: createOrderDto.notes,
  //   });

  //   // Save order
  //   const savedOrder = await order.save();

  //   return savedOrder;
  // }
  async create(createOrderDto: CreateOrderDto) {
    // Verify vendor exists and store is open
    const vendor = await this.vendorService.findById(createOrderDto.vendorId);
    if (!vendor) {
      throw new NotFoundException('Vendor not found');
    }
    if (!vendor.isStoreOpen) {
      throw new BadRequestException('Vendor store is currently closed');
    }

    // Calculate total amount and validate items
    let subTotal = 0; // Renamed from totalAmount to be more explicit
    const packs = [];

    for (const pack of createOrderDto.packs) {
      const packItems = [];
      let packTotal = 0;

      // Default pack quantity to 1 if not specified
      const packQuantity = pack.quantity || 1;

      for (const item of pack.items) {
        const menuItem = await this.menuService.findOne(item.menuItemId);
        if (!menuItem) {
          throw new NotFoundException(`Menu item ${item.menuItemId} not found`);
        }
        if (!menuItem.isEnabled) {
          throw new BadRequestException(
            `Menu item ${menuItem.name} is not available`,
          );
        }

        const itemTotal = menuItem.price * item.quantity * packQuantity;
        packTotal += itemTotal;

        packItems.push({
          menuItemId: item.menuItemId,
          quantity: item.quantity,
          price: menuItem.price,
        });
      }

      subTotal += packTotal;
      packs.push({
        items: packItems,
        quantity: packQuantity,
      });
    }

    // Calculate total amount including charge
    const charge = createOrderDto.charge || 100; // Default charge if not provided
    const totalAmount = subTotal + charge;

    // Generate order ID
    const alphabet =
      '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const generateId = customAlphabet(alphabet, 12);

    // Create order
    const order = new this.orderModel({
      orderId: `ST-${generateId()}`,
      vendorId: createOrderDto.vendorId,
      customerName: createOrderDto.customerName,
      phoneNumber: createOrderDto.phoneNumber,
      deliveryType: createOrderDto.deliveryType,
      location: createOrderDto.location,
      address: createOrderDto.address,
      packs,
      subTotal, // Store subtotal separately
      charge, // Store charge separately
      totalAmount, // Store the final total
      packPrice: createOrderDto.packPrice,
      deliveryPrice: createOrderDto.deliveryPrice,
      status: OrderStatus.PENDING,
      notes: createOrderDto.notes,
    });

    // Save order
    const savedOrder = await order.save();

    const populatedOrder = await this.orderModel
      .findById(savedOrder._id)
      .populate({
        path: 'packs.items.menuItemId',
        model: 'MenuItem',
        select: 'name description price image',
      })
      .lean()
      .exec();

    return populatedOrder;
  }
  async findAllVendorOrders(
    vendorId: string,
    page = 1,
    limit = 10,
    startDate?: Date,
    endDate?: Date,
    search?: string,
  ) {
    // Validate and parse pagination parameters
    const parsedPage = Math.max(1, Number(page) || 1);
    const parsedLimit = Math.min(Math.max(1, Number(limit) || 10), 100);
    const skip = (parsedPage - 1) * parsedLimit;

    // Build secure query ensuring vendor ownership
    const query: FilterQuery<Order> = {
      vendorId: new mongoose.Types.ObjectId(vendorId),
      isDeleted: { $ne: true }, // More reliable than checking for false
    };

    // Add date filtering if provided
    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    // Add search functionality
    if (search?.trim()) {
      query.$or = [
        { customerName: { $regex: search.trim(), $options: 'i' } },
        { phoneNumber: { $regex: search.trim(), $options: 'i' } },
        { orderId: { $regex: search.trim(), $options: 'i' } }, // Include orderId in search
      ];
    }

    // Execute optimized query with lean() for better performance
    const [orders, total] = await Promise.all([
      this.orderModel
        .find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parsedLimit)
        .populate('packs.items.menuItemId')
        .lean(), // Returns plain JS objects for better performance

      this.orderModel.countDocuments(query),
    ]);

    return {
      orders,
      total,
      page: parsedPage,
      limit: parsedLimit,
      totalPages: Math.ceil(total / parsedLimit),
    };
  }

  async getTodaysVendorOrders(
    vendorId: string,
    page = 1,
    limit = 10,
    search?: string,
  ) {
    const parsedPage = Math.max(1, Number(page) || 1);
    const parsedLimit = Math.min(Math.max(1, Number(limit) || 10), 100);
    const skip = (parsedPage - 1) * parsedLimit;

    // Get start and end of current day
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);
    const query: FilterQuery<Order> = {
      vendorId: new mongoose.Types.ObjectId(vendorId),
      createdAt: {
        $gte: todayStart,
        $lte: todayEnd,
      },
      isDeleted: { $ne: true },
    };

    if (search?.trim()) {
      query.$or = [
        { customerName: { $regex: search.trim(), $options: 'i' } },
        { phoneNumber: { $regex: search.trim(), $options: 'i' } },
        { orderId: { $regex: search.trim(), $options: 'i' } }, // Include orderId in search
      ];
    }

    const [orders, total] = await Promise.all([
      this.orderModel
        .find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parsedLimit)
        .populate('packs.items.menuItemId')
        .lean(), 

      this.orderModel.countDocuments(query),
    ]);

    return {
      orders,
      total,
      page: parsedPage,
      limit: parsedLimit,
      totalPages: Math.ceil(total / parsedLimit),
    };
  }

  async findOrderById(orderId: string, vendorId: string) {
    const order = await this.orderModel.findOne({ _id: orderId, vendorId });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }
  

  async updateStatus(id: string, updateOrderStatusDto: UpdateOrderStatusDto) {
    const order = await this.orderModel.findByIdAndUpdate(
      id,
      { status: updateOrderStatusDto.status },
      {
        new: true,
      },
    );

    return order;
  }
}
