import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MenuItem } from './schemas/menu-item.schema';
import mongoose, { Model } from 'mongoose';
import { CategoryService } from '../category/category.service';
import { InjectModel } from '@nestjs/mongoose';
import { CreateMenuItemDto } from './dto/create-menu.dto';
import { UpdateMenuItemDto } from './dto/update-menu.dto';

@Injectable()
export class MenuService {
  constructor(
    @InjectModel(MenuItem.name) private menuItemModel: Model<MenuItem>,
    private categoryService: CategoryService,
  ) {}

  async addItem(vendorId: string, createMenuItemDto: CreateMenuItemDto) {
    const { name, price, categoryId, image } = createMenuItemDto;

    await this.categoryService.findCategoryById(vendorId, categoryId);

    const existingCategory = await this.menuItemModel.findOne({
      name: createMenuItemDto.name,
      vendorId: vendorId,
      isDeleted: false,
    });

    if (existingCategory) {
      throw new ConflictException('Menu Item with this name already exists');
    }
    const newItem = await this.menuItemModel.create({
      name: name,
      price: price,
      categoryId: categoryId,
      image: image,
      vendorId: vendorId,
    });

    return newItem;
  }

  // async getMenuList(vendorId: string) {
  //   const menuList = await this.menuItemModel.find({
  //     vendorId: vendorId,
  //     isDeleted: false,
  //   });

  //   return menuList;
  // }

  async getMenuList(
    vendorId: string,
    search?: string,
    page: number = 1,
    limit: number = 10,
  ) {
    // Validate and parse pagination inputs
    const parsedPage = Math.max(1, Number(page) || 1);
    const parsedLimit = Math.min(Math.max(1, Number(limit) || 10, 100));

    // Build base query
    const query: any = {
      vendorId: new mongoose.Types.ObjectId(vendorId),
      isDeleted: false,
    };

    // Add search filter (case-insensitive)
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    // Execute parallel queries for data and count
    const [menuItems, total] = await Promise.all([
      this.menuItemModel
        .find(query)
        .populate('categoryId', 'name') // Lightweight category info
        .skip((parsedPage - 1) * parsedLimit)
        .limit(parsedLimit)
        .lean(), // Faster response

      this.menuItemModel.countDocuments(query),
    ]);

    return {
      data: menuItems,
      total,
      page: parsedPage,
      limit: parsedLimit,
      totalPages: Math.ceil(total / parsedLimit),
    };
  }

  async findMenuItemById(vendorId: string, id: string) {
    const item = await this.menuItemModel
      .findOne({
        _id: id,
        vendorId: vendorId,
        isDeleted: false,
      })
      .exec();

    if (!item) {
      throw new NotFoundException('Menu Item not found');
    }

    return item;
  }

  async updateMenuItem(
    vendorId: string,
    id: string,
    updateMenuItemDto: UpdateMenuItemDto,
  ) {
    await this.findMenuItemById(vendorId, id);

    const updatedMenuItem = await this.menuItemModel
      .findByIdAndUpdate(id, updateMenuItemDto, {
        new: true,
      })
      .exec();

    return updatedMenuItem;
  }

  async deleteMenuItem(vendorId: string, id: string) {
    await this.findMenuItemById(vendorId, id);

    const deletedMenuItem = await this.menuItemModel
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

  async disableMenuItem(vendorId: string, id: string) {
    await this.findMenuItemById(vendorId, id);

    const menuItem = await this.menuItemModel
      .findByIdAndUpdate(
        id,
        { isEnabled: false },
        {
          new: true,
        },
      )
      .exec();

    return menuItem;
  }

  async enableMenuItem(vendorId: string, id: string) {
    await this.findMenuItemById(vendorId, id);

    const menuItem = await this.menuItemModel
      .findByIdAndUpdate(
        id,
        { isEnabled: true },
        {
          new: true,
        },
      )
      .exec();

    return menuItem;
  }

  async findOne(id: string): Promise<MenuItem> {
    const menuItem = await this.menuItemModel
      .findById(id)
      .populate('categoryId')
      .populate('vendorId')
      .exec();
    if (!menuItem) {
      throw new NotFoundException('Menu item not found');
    }
    return menuItem;
  }

  async findVendorsMenu(vendorId: string) {
    const menu = await this.menuItemModel.find({ vendorId: vendorId });

    return menu;
  }
}
