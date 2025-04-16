import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  ConflictException,
  HttpException,
  HttpStatus,
  NotFoundException,
  BadRequestException,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { DeliveryLocationService } from './delivery-location.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateDeliveryLocationDto } from './dto/create-delivery-location.dto';
import { UpdateDeliveryLocationDto } from './dto/update-delivery-location.dto';

@Controller('delivery-location')
export class DeliveryLocationController {
  constructor(
    private readonly deliveryLocationService: DeliveryLocationService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async AddDeliveryLocation(
    @Request() req,
    @Body() createLocationDto: CreateDeliveryLocationDto,
  ) {
    try {
      return this.deliveryLocationService.addDeliveryLocation(
        req.user._id,
        createLocationDto,
      );
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      } else if (error instanceof BadRequestException) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Get('all')
  @UseGuards(JwtAuthGuard)
  async GetAllDeliveryLocation(@Request() req) {
    try {
      return this.deliveryLocationService.getDeliveryLocation(req.user._id);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      } else if (error instanceof BadRequestException) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Get(':vendorId')
  async getLocationByVendor(@Param('vendorId') vendorId: string) {
    try {
      return this.deliveryLocationService.getDeliveryLocationByVendor(vendorId);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      } else if (error instanceof BadRequestException) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async UpdateLocation(
    @Request() req,
    @Param('id') id: string,
    @Body() updateLocationDto: UpdateDeliveryLocationDto,
  ) {
    try {
      return this.deliveryLocationService.updateDelieveryLocation(
        req.user._id,
        id,
        updateLocationDto,
      );
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      } else if (error instanceof BadRequestException) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async DeleteLocation(@Request() req, @Param('id') id: string) {
    try {
      return this.deliveryLocationService.deleteDeliveryLocation(
        req.user._id,
        id,
      );
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      } else if (error instanceof BadRequestException) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
