import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { VendorSignupDto } from './dto/vendor-signup.dto';
import { CustomerSignupDto } from './dto/customer-signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('vendor/signup')
  // @ApiOperation({ summary: 'Vendor signup' })
  // @ApiResponse({ status: 201, description: 'Vendor successfully registered' })
  // @ApiResponse({ status: 400, description: 'Bad request' })
  async vendorSignup(@Body() vendorSignupDto: VendorSignupDto) {
    try {
      return this.authService.vendorSignup(vendorSignupDto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
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

  @Post('customer/signup')
  // @ApiOperation({ summary: 'Customer signup' })
  // @ApiResponse({ status: 201, description: 'Customer successfully registered' })
  // @ApiResponse({ status: 400, description: 'Bad request' })
  async customerSignup(@Body() customerSignupDto: CustomerSignupDto) {
    try {
      return this.authService.customerSignup(customerSignupDto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
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

  @Post('vendor/login')
  @HttpCode(HttpStatus.OK)
  // @ApiOperation({ summary: 'Vendor login' })
  // @ApiResponse({ status: 200, description: 'Vendor successfully logged in' })
  // @ApiResponse({ status: 401, description: 'Unauthorized' })
  async vendorLogin(@Body() loginDto: LoginDto) {
    try {
      return this.authService.vendorLogin(loginDto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
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

  @Post('customer/login')
  @HttpCode(HttpStatus.OK)
  // @ApiOperation({ summary: 'Customer login' })
  // @ApiResponse({ status: 200, description: 'Customer successfully logged in' })
  // @ApiResponse({ status: 401, description: 'Unauthorized' })
  async customerLogin(@Body() loginDto: LoginDto) {
    try {
      return this.authService.customerLogin(loginDto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
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
