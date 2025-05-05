import {
    ConflictException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { CreateReviewDto } from './dto/create-review.dto';
  import { InjectModel } from '@nestjs/mongoose';
  import { Review } from './schemas/review.schema';
  import mongoose, { Model } from 'mongoose';
  import { UpdateReviewDto } from './dto/update-review.dto';
  
  @Injectable()
  export class ReviewService {
    constructor(
      @InjectModel(Review.name) private reviewModel: Model<Review>,
    ) {}
    async createReview(vendorId: string, createReviewDto: CreateReviewDto) {
      const review = await this.reviewModel.create({
        name: createReviewDto.message,
        vendorId: vendorId,
      });
      return review;
    }
  
   
    async getAllReviews(
      vendorId: string
    ) {
        return this.reviewModel.findById({ vendorId})
    }
  
    async findReviewById(vendorId, id: string): Promise<Review> {
      const review = await this.reviewModel
        .findOne({
          _id: id,
          vendorId: vendorId
        })
        .exec();
  
      if (!review) {
        throw new NotFoundException('Vendor not found');
      }
  
      return review;
    }
  
    async updateReview(
      vendorId: string,
      id: string,
      updateReviewDto: UpdateReviewDto,
    ) {
      // Verify category exists first
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
  