import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Review } from './schemas/review.schema';
import { Vendor } from '../vendor/schemas/vendor.schema';
import mongoose, { Model } from 'mongoose';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<Review>,
    @InjectModel(Vendor.name) private vendorModel: Model<Vendor>,
  ) {}

  async createReview(vendorId: string, createReviewDto: CreateReviewDto) {
    // First check if vendor exists
    const vendor = await this.vendorModel.findById(vendorId);
    if (!vendor) {
      throw new NotFoundException(`Vendor with ID ${vendorId} not found`);
    }

    // Create the review
    const review = await this.reviewModel.create({
      message: createReviewDto.message,
      rating: createReviewDto.rating,
      vendorId: vendorId,
      customerName: createReviewDto.customerName,
      customerId: createReviewDto.customerId,
    });

    // Add the review to the vendor's reviews array
    await this.vendorModel.findByIdAndUpdate(
      vendorId,
      { $push: { reviews: review._id } },
      { new: true }
    );

    return review;
  }

  async getAllReviews(vendorId: string) {
    // Check if vendor exists
    const vendor = await this.vendorModel.findById(vendorId);
    if (!vendor) {
      throw new NotFoundException(`Vendor with ID ${vendorId} not found`);
    }

    // Find all non-deleted reviews for this vendor
    return this.reviewModel.find({ 
      vendorId: vendorId,
      isDeleted: { $ne: true }
    }).sort({ createdAt: -1 });
  }

  async findReviewById(vendorId: string, id: string): Promise<Review> {
    const review = await this.reviewModel
      .findOne({
        _id: id,
        vendorId: vendorId,
        isDeleted: { $ne: true }
      })
      .exec();

    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }

    return review;
  }

  async updateReview(
    vendorId: string,
    id: string,
    updateReviewDto: UpdateReviewDto,
  ) {
    // Verify review exists first
    await this.findReviewById(vendorId, id);

    // Use the model directly for update
    const updatedReview = await this.reviewModel
      .findByIdAndUpdate(id, updateReviewDto, {
        new: true,
      })
      .exec();

    return updatedReview;
  }

  async deleteReview(vendorId: string, id: string) {
    await this.findReviewById(vendorId, id);

    const deletedReview = await this.reviewModel
      .findByIdAndUpdate(
        id,
        { isDeleted: true },
        {
          new: true,
        },
      )
      .exec();

    return deletedReview;
  }
}