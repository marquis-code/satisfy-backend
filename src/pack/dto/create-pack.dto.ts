import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePackDto {
  @IsNotEmpty()
  @IsNumber()
  price: number;
}
