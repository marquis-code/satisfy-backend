// import {
//   IsEmail,
//   IsNotEmpty,
//   IsString,
//   IsOptional,
//   IsBoolean,
//   ValidateNested,
//   IsArray,
//   IsObject,
//   IsNumber,
// } from 'class-validator';
// import { Type } from 'class-transformer';

// class PackSettingsDto {
//   @IsNumber()
//   @IsOptional()
//   limit?: number;

//   @IsNumber()
//   @IsOptional()
//   number?: number;
// }

// class WorkingHourDto {
//   @IsString()
//   day: string;

//   @IsBoolean()
//   @IsOptional()
//   isActive?: boolean;

//   @IsString()
//   @IsOptional()
//   openingTime?: string;

//   @IsString()
//   @IsOptional()
//   closingTime?: string;
// }

// export class VendorSignupDto {
//   @IsOptional()
//   @IsString()
//   firstName?: string;

//   @IsOptional()
//   @IsString()
//   lastName?: string;

//   @IsOptional()
//   @IsString()
//   description?: string;

//   @IsNotEmpty()
//   @IsString()
//   restaurantName: string;

//   // slug will be generated in the service, no need for user input

//   @IsNotEmpty()
//   @IsEmail()
//   email: string;

//   @IsNotEmpty()
//   @IsString()
//   phoneNumber: string;

//   @IsNotEmpty()
//   @IsString()
//   locationName: string;

//   @IsNotEmpty()
//   @IsString()
//   address: string;

//   @IsOptional()
//   @IsString()
//   displayImage?: string;

//   @IsNotEmpty()
//   @IsString()
//   category: string;

//   @IsNotEmpty()
//   @IsString()
//   password: string;

//   @IsOptional()
//   @IsBoolean()
//   isStoreOpen?: boolean;

//   @IsOptional()
//   @ValidateNested()
//   @Type(() => PackSettingsDto)
//   packSettings?: PackSettingsDto;

//   @IsOptional()
//   @IsArray()
//   @ValidateNested({ each: true })
//   @Type(() => WorkingHourDto)
//   workingHours?: WorkingHourDto[];
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

class DeliveryLocationDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  deliveryFee?: number;
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

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DeliveryLocationDto)
  deliveryLocations?: DeliveryLocationDto[];
}
