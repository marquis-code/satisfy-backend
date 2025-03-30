import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schemas/category.schema';
import mongoose, { Model } from 'mongoose';
import { MenuItem } from '../menu/schemas/menu-item.schema';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel(MenuItem.name) private menuModel: Model<MenuItem>,
  ) {}
  async createCategory(vendorId: string, createCategoryDto: CreateCategoryDto) {
    const existingCategory = await this.categoryModel.findOne({
      name: createCategoryDto.name,
      vendorId: vendorId,
      isDeleted: false,
    });

    if (existingCategory) {
      throw new ConflictException('Category with this name already exists');
    }

    const category = await this.categoryModel.create({
      name: createCategoryDto.name,
      vendorId: vendorId,
    });

    return category;
  }

 
  async getAllCategories(
    vendorId: string,
    search?: string,
    page: number = 1,
    limit: number = 10,
  ) {
    // Ensure page and limit are valid numbers
    const parsedPage = Math.max(1, Number(page) || 1);
    const parsedLimit = Math.min(Math.max(1, Number(limit) || 10), 100); // Cap at 100 items

    const pipeline: any[] = [
      {
        $match: {
          vendorId: new mongoose.Types.ObjectId(vendorId),
          isDeleted: false,
          ...(search && {
            name: { $regex: search, $options: 'i' },
          }),
        },
      },
      {
        $lookup: {
          from: 'menuitems',
          localField: '_id',
          foreignField: 'categoryId',
          as: 'menuItems',
        },
      },
      {
        $addFields: {
          menuItemCount: { $size: '$menuItems' },
        },
      },
      {
        $project: {
          menuItems: 0,
        },
      },
    ];

    const [categories, total] = await Promise.all([
      this.categoryModel
        .aggregate([
          ...pipeline,
          { $skip: (parsedPage - 1) * parsedLimit },
          { $limit: parsedLimit },
        ])
        .exec(),
      this.categoryModel.aggregate([...pipeline, { $count: 'total' }]).exec(),
    ]);

    return {
      data: categories,

      total: total[0]?.total || 0,
      page: parsedPage,
      limit: parsedLimit,
      totalPages: Math.ceil((total[0]?.total || 0) / parsedLimit),
    };
  }

  async findCategoryById(vendorId: string, id: string): Promise<Category> {
    const category = await this.categoryModel
      .findOne({
        _id: id,
        vendorId: vendorId,
        isDeleted: false,
      })
      .exec();

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async updateCategory(
    vendorId: string,
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ) {
    // Verify category exists first
    await this.findCategoryById(vendorId, id);

    // Use the model directly for update
    const updatedCategory = await this.categoryModel
      .findByIdAndUpdate(id, updateCategoryDto, {
        new: true,
      })
      .exec();

    return updatedCategory;
  }

  async deleteCategory(vendorId: string, id: string) {
    await this.findCategoryById(vendorId, id);

    const deletedCategory = await this.categoryModel
      .findByIdAndUpdate(
        id,
        { isDeleted: true },
        {
          new: true,
        },
      )
      .exec();

    return deletedCategory;
  }
}
