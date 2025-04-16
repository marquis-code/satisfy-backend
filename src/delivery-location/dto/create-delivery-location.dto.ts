import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDeliveryLocationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  deliveryFee?: number;
}
