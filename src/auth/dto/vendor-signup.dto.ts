import { IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class VendorSignupDto {
  //   @ApiProperty({ example: 'Tasty Bites' })
  @IsNotEmpty()
  @IsString()
  restaurantName: string;

  //   @ApiProperty({ example: 'john@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  //   @ApiProperty({ example: '1234567890' })
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  //   @ApiProperty({ example: 'University of Example' })
  @IsNotEmpty()
  @IsString()
  locationName: string;

  //   @ApiProperty({ example: '123 Main St, City' })
  @IsNotEmpty()
  @IsString()
  address: string;

  //   @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  displayImage?: string;

  //   @ApiProperty({ example: 'Fast Food' })
  @IsNotEmpty()
  @IsString()
  category: string;

  //   @ApiProperty({ example: 'password123' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
