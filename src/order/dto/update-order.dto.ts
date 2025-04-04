import { IsNotEmpty, IsEnum } from 'class-validator';
import { OrderStatus } from '../order-status.enum';

export class UpdateOrderStatusDto {
  @IsNotEmpty()
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
