// import { IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator';

// export class VendorSignupDto {
//   //   @ApiProperty({ example: 'Tasty Bites' })
//   @IsNotEmpty()
//   @IsString()
//   restaurantName: string;

//   //   @ApiProperty({ example: 'john@example.com' })
//   @IsNotEmpty()
//   @IsEmail()
//   email: string;

//   //   @ApiProperty({ example: '1234567890' })
//   @IsNotEmpty()
//   @IsString()
//   phoneNumber: string;

//   //   @ApiProperty({ example: 'University of Example' })
//   @IsNotEmpty()
//   @IsString()
//   locationName: string;

//   //   @ApiProperty({ example: '123 Main St, City' })
//   @IsNotEmpty()
//   @IsString()
//   address: string;

//   //   @ApiProperty({ required: false })
//   @IsOptional()
//   @IsString()
//   displayImage?: string;

//   //   @ApiProperty({ example: 'Fast Food' })
//   @IsNotEmpty()
//   @IsString()
//   category: string;

//   //   @ApiProperty({ example: 'password123' })
//   @IsNotEmpty()
//   @IsString()
//   password: string;
// }


import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsBoolean,
  ValidateNested,
  IsArray,
  IsObject,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

class PackSettingsDto {
  @IsNumber()
  @IsOptional()
  limit?: number;

  @IsNumber()
  @IsOptional()
  number?: number;
}

class WorkingHourDto {
  @IsString()
  day: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsString()
  @IsOptional()
  openingTime?: string;

  @IsString()
  @IsOptional()
  closingTime?: string;
}

export class VendorSignupDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsString()
  restaurantName: string;

  // slug will be generated in the service, no need for user input

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  locationName: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  displayImage?: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsBoolean()
  isStoreOpen?: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => PackSettingsDto)
  packSettings?: PackSettingsDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WorkingHourDto)
  workingHours?: WorkingHourDto[];
}
