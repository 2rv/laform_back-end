import { IsNotEmpty, IsObject } from 'class-validator';

export class CreateOrUpdateFaqDeliveryPaymentDto {
  @IsNotEmpty()
  @IsObject()
  data: {
    blocks: [];
    time: number;
    version: string;
  };
}
