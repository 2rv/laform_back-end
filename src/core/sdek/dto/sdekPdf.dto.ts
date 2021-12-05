import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class SdekPdfDto {
  @IsNotEmpty()
  @IsArray()
  orders: OrdersDto[];
}
export class OrdersDto {
  @IsNotEmpty()
  @IsString()
  order_uuid: string;
}
