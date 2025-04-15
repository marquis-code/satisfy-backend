import { BadRequestException, ConflictException, Controller,   Get, HttpException, HttpStatus, NotFoundException, Param
} from "@nestjs/common";
import { VendorService } from "./vendor.service";

@Controller()
export class UrlController {
  constructor(private readonly vendorService: VendorService) {}

  @Get(':slug')
  async findVendorBySlug(@Param('slug') slug: string) {
    try {
      return await this.vendorService.findVendorBySlug(slug);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      } else if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      } else if (error instanceof BadRequestException) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}