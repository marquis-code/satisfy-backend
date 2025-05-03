// delivery-location.controller.ts
import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    NotFoundException,
    Param,
    Patch,
    Post,
    Request,
    UseGuards,
    ConflictException,
  } from '@nestjs/common';
  import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
  import { DeliveryLocationService } from './delivery-location.service';
  import { CreateDeliveryLocationDto, UpdateDeliveryLocationDto } from './dto/delivery-location.dto';
  
  @Controller('updated-delivery-location')
  export class DeliveryLocationController {
    constructor(private readonly deliveryLocationService: DeliveryLocationService) {}
  
    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Request() req, @Body() createDto: CreateDeliveryLocationDto) {
      try {
        return await this.deliveryLocationService.create(req.user._id, createDto);
      } catch (error) {
        if (error instanceof ConflictException) {
          throw new HttpException(error.message, HttpStatus.CONFLICT);
        } else if (error instanceof NotFoundException) {
          throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        } else if (error instanceof BadRequestException) {
          throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        } else {
          throw new HttpException(
            error.message || 'Internal server error',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }
    }
  
    @Get()
    @UseGuards(JwtAuthGuard)
    async findAll(@Request() req) {
      try {
        return await this.deliveryLocationService.findAllForVendor(req.user._id);
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        } else if (error instanceof BadRequestException) {
          throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        } else {
          throw new HttpException(
            error.message || 'Internal server error',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }
    }

    @Get('vendor/:vendorId')
    // @UseGuards(JwtAuthGuard)
    async findByVendorId(@Param('vendorId') vendorId: string) {
      try {
        if (!vendorId) {
          throw new BadRequestException('Vendor ID is required');
        }
        return await this.deliveryLocationService.findAllForVendor(vendorId);
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        } else if (error instanceof BadRequestException) {
          throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        } else {
          throw new HttpException(
            error.message || 'Internal server error',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string) {
      try {
        return await this.deliveryLocationService.findById(id);
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        } else if (error instanceof BadRequestException) {
          throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        } else {
          throw new HttpException(
            error.message || 'Internal server error',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }
    }
  
    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async update(
      @Param('id') id: string,
      @Body() updateDto: UpdateDeliveryLocationDto,
    ) {
      try {
        return await this.deliveryLocationService.update(id, updateDto);
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        } else if (error instanceof BadRequestException) {
          throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        } else {
          throw new HttpException(
            error.message || 'Internal server error',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }
    }
  
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async delete(@Request() req, @Param('id') id: string) {
      try {
        return await this.deliveryLocationService.delete(req.user._id, id);
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        } else if (error instanceof BadRequestException) {
          throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        } else {
          throw new HttpException(
            error.message || 'Internal server error',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }
    }
  }