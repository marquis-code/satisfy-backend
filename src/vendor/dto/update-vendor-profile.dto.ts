import { IsOptional, IsString, IsEmail } from 'class-validator';

export class UpdateVendorProfileDto {
  @IsOptional()
  @IsString()
  restaurantName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  locationName?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  displayImage?: string;
}
