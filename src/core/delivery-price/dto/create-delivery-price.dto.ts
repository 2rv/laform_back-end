import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDeliveryPriceDto {
  @IsNotEmpty()
  @IsString()
  deliveryType: string;

  @IsNotEmpty()
  @IsNumber()
  deliveryTypePrice: number;
}
