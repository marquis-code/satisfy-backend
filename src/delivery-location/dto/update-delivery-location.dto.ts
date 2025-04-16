import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateDeliveryLocationDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  deliveryFee?: number;
}
