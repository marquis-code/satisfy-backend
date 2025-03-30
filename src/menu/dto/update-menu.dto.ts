import {  IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateMenuItemDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  categoryId: string;

  @IsOptional()
  @IsString()
  image?: string;
}
