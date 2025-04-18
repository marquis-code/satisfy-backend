// // import {
// //   IsNotEmpty,
// //   IsString,
// //   IsArray,
// //   IsEnum,
// //   IsOptional,
// //   ValidateNested,
// //   Min,
// //   IsNumber,
// // } from 'class-validator';
// // import { Type } from 'class-transformer';
// // import { OrderDelivery } from '../order-delivery.enum';

// // class OrderItemDto {
// //   @IsNotEmpty()
// //   @IsString()
// //   menuItemId: string;

// //   @IsNotEmpty()
// //   @IsNumber()
// //   @Min(1)
// //   quantity: number;
// // }

// // export class CreateOrderDto {
// //   @IsNotEmpty()
// //   @IsString()
// //   vendorId: string;

// //   @IsOptional()
// //   @IsString()
// //   customerName: string;

// //   @IsNotEmpty()
// //   @IsString()
// //   phoneNumber: string;

// //   @IsNotEmpty()
// //   @IsEnum(OrderDelivery)
// //   deliveryType: OrderDelivery;

// //   @IsNotEmpty()
// //   @IsString()
// //   location: string;

// //   @IsOptional()
// //   @IsString()
// //   address?: string;

// //   @IsArray()
// //   @ValidateNested({ each: true })
// //   @Type(() => OrderItemDto)
// //   items: OrderItemDto[];

// //   @IsOptional()
// //   @IsString()
// //   notes?: string;
// // }

// // create-order.dto.ts
// import {
//   IsNotEmpty,
//   IsString,
//   IsArray,
//   IsEnum,
//   IsOptional,
//   ValidateNested,
//   Min,
//   IsNumber,
// } from 'class-validator';
// import { Type } from 'class-transformer';
// import { OrderDelivery } from '../order-delivery.enum';

// class OrderItemDto {
//   @IsNotEmpty()
//   @IsString()
//   menuItemId: string;

//   @IsNotEmpty()
//   @IsNumber()
//   @Min(1)
//   quantity: number;
// }

// class OrderPackDto {
//   @IsArray()
//   @ValidateNested({ each: true })
//   @Type(() => OrderItemDto)
//   items: OrderItemDto[];

//   @IsOptional()
//   @IsNumber()
//   @Min(1)
//   quantity?: number; // Quantity of this pack (defaults to 1 if not specified)
// }

// export class CreateOrderDto {
//   @IsNotEmpty()
//   @IsString()
//   vendorId: string;

//   @IsOptional()
//   @IsString()
//   customerName: string;

//   @IsNotEmpty()
//   @IsString()
//   phoneNumber: string;

//   @IsNotEmpty()
//   @IsEnum(OrderDelivery)
//   deliveryType: OrderDelivery;

//   @IsNotEmpty()
//   @IsString()
//   location: string;

//   @IsOptional()
//   @IsString()
//   address?: string;

//   @IsArray()
//   @ValidateNested({ each: true })
//   @Type(() => OrderPackDto)
//   packs: OrderPackDto[];

//   @IsOptional()
//   @IsString()
//   notes?: string;

//   @IsOptional()
//   @IsNumber()
//   charge?: number;
// }

import {
  IsNotEmpty,
  IsString,
  IsArray,
  ValidateNested,
  IsNumber,
  Min,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OrderDelivery } from '../order-delivery.enum';

class OrderItemDto {
  @IsNotEmpty()
  @IsString()
  menuItemId: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;
}

class OrderPackDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @IsOptional()
  @IsNumber()
  @Min(1)
  quantity?: number;
}

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  vendorId: string;

  @IsOptional()
  @IsString()
  customerName?: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsNotEmpty()
  @IsEnum(OrderDelivery)
  deliveryType: OrderDelivery;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderPackDto)
  packs: OrderPackDto[];

  @IsOptional()
  @IsNumber()
  charge?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}
