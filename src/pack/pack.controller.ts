import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  HttpException,
  BadRequestException,
  ConflictException,
  NotFoundException,
  HttpStatus,
  Get,
  Patch,
  Param,
} from '@nestjs/common';
import { PackService } from './pack.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreatePackDto } from './dto/create-pack.dto';

@Controller('pack')
export class PackController {
  constructor(private readonly packService: PackService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async AddPack(@Request() req, @Body() createPackDto: CreatePackDto) {
    try {
      return this.packService.addPackPrice(req.user._id, createPackDto);
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

  @Get()
  @UseGuards(JwtAuthGuard)
  async GetAllDeliveryLocation(@Request() req) {
    try {
      return this.packService.getVendorPack(req.user._id);
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
  async UpdatePackPrice(
    @Request() req,
    @Param('id') id: string,
    @Body() updatePackDto: CreatePackDto,
  ) {
    try {
      return this.packService.updatePackPrice(req.user._id, id, updatePackDto);
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
