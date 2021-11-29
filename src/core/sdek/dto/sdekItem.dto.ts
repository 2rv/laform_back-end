import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class PaymentDto {
  @IsNotEmpty()
  @IsNumber()
  value: number;
}

export class SdekItemsDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  ware_key: string;

  @IsNotEmpty()
  payment: PaymentDto;

  @IsNotEmpty()
  @IsNumber()
  cost: number;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
