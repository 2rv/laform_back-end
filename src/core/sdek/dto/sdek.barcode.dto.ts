import { IsNotEmpty, IsArray, IsUUID } from 'class-validator';

export class SdekBarcoderDto {
  @IsNotEmpty()
  @IsArray()
  orders: SdekSOrdersDto[];
}

export class SdekSOrdersDto {
  @IsNotEmpty()
  @IsUUID('all')
  order_uuid: string;
}
